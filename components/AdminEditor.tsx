'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { cmsConfigured, cmsRequest, uploadImage } from '@/lib/cms/client';
import { defaultContent, defaultTexts, normalizeContent, type Content } from '@/lib/cms/model';
import ru from '@/lib/i18n/dictionaries/ru';

const sectionNames: Record<string, string> = {
  meta: 'Название сайта и описание для поиска', nav: 'Меню', home: 'Главная',
  categories: 'Категории изделий', collections: 'Коллекции', production: 'Производство',
  contract: 'Контрактное производство', about: 'О бренде', contacts: 'Контакты',
  footer: 'Подвал сайта', placeholders: 'Подписи фотографий', common: 'Общие подписи',
  forms: 'Формы заявок', privacy: 'Политика конфиденциальности', consent: 'Согласие',
};
const button = 'rounded bg-bordeaux px-4 py-3 text-sm text-white disabled:opacity-40';
const secondary = 'rounded border border-line bg-white px-3 py-2 text-sm disabled:opacity-40';
const field = 'mt-2 block w-full rounded border border-line bg-white p-3 text-base';
export default function AdminEditor() {
  const [token, setToken] = useState('');
  const [content, setContent] = useState<Content>(defaultContent);
  const [revision, setRevision] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<'photos'|'logos'|'texts'>('photos');
  const [category, setCategory] = useState('bryuki');
  const [locale, setLocale] = useState<'ru'|'en'>('ru');
  const [section, setSection] = useState('home');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const listener = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', listener);
    return () => window.removeEventListener('beforeunload', listener);
  }, [dirty]);
  function change(next: Content) { setContent(next); setDirty(true); setMessage('Есть неопубликованные изменения.'); }
  async function run(action: () => Promise<void>) {
    setBusy(true); setMessage('');
    try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Не удалось выполнить действие.'); }
    finally { setBusy(false); }
  }
  async function login(event: React.FormEvent) {
    event.preventDefault();
    await run(async () => {
      const session = await cmsRequest('/auth/v1/token?grant_type=password', undefined, { method: 'POST', body: JSON.stringify({ email, password }) });
      setPassword('');
      const editors = await cmsRequest('/rest/v1/aia_editors?select=user_id', session.access_token);
      if (!editors.length) throw new Error('У этой учётной записи нет доступа к управлению сайтом.');
      const rows = await cmsRequest('/rest/v1/aia_content?id=eq.1&select=data,revision', session.access_token);
      if (!rows.length) throw new Error('Хранилище сайта ещё не настроено.');
      setContent(normalizeContent(rows[0].data)); setRevision(rows[0].revision);
      setToken(session.access_token); setDirty(false); setMessage('Вы вошли. Выберите раздел для редактирования.');
    });
  }
  async function publish() {
    await run(async () => {
      const nextRevision = await cmsRequest('/rest/v1/rpc/aia_save_content', token, {
        method: 'POST', body: JSON.stringify({ expected_revision: revision, new_data: normalizeContent(content) }),
      });
      setRevision(nextRevision); setDirty(false); setMessage('Изменения опубликованы. Откройте сайт или обновите его страницу.');
    });
  }
  const selected = content.categories.find(c => c.slug === category)!;
  function setPhotos(image: string | null, gallery: string[]) {
    change({ ...content, categories: content.categories.map(c => c.slug === category ? { ...c, image, gallery } : c) });
  }
  async function addFiles(files: FileList | null, target: 'category'|'production'|'brand') {
    if (!files?.length) return;
    const list = Array.from(files);
    if (target === 'category' && list.length + (selected.gallery?.length ?? 0) > 30) { setMessage('Можно добавить не больше 30 дополнительных фото в категорию.'); return; }
    await run(async () => {
      const urls: string[] = [];
      // Apply each successful upload so a later network error does not discard earlier photos.
      for (const file of list) {
        const result = await uploadImage(file, token); urls.push(result);
        if (target === 'category') {
          const all = [...(selected.image ? [selected.image] : []), ...(selected.gallery ?? []), ...urls];
          setPhotos(all[0] ?? null, all.slice(1));
        } else change({ ...content, logos: { ...content.logos, [target]: result } });
      }
      setMessage('Фото загружены. Нажмите «Опубликовать изменения», чтобы показать их на сайте.');
    });
  }
  return <section className="mx-auto max-w-5xl px-4 py-10">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-sm text-bordeaux">АЙА · Управление</p><h1 className="mt-2 text-3xl font-semibold">Содержание сайта</h1></div>
      <a href="/ru" target="_blank" rel="noopener noreferrer" className={secondary}>Открыть сайт ↗</a>
    </div>
    {!cmsConfigured ? <div className="rounded border border-line bg-white p-6"><h2 className="text-xl">Панель готовится к запуску</h2><p className="mt-3">Вход и сохранение пока недоступны: необходимо завершить подключение хранилища и создать учётную запись владельца.</p></div>
    : !token ? <form onSubmit={login} className="max-w-md space-y-5 rounded border border-line bg-white p-6">
      <h2 className="text-xl">Вход владельца</h2>
      <label className="block">Электронная почта<input className={field} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label className="block">Пароль<input className={field} type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button className={button} disabled={busy}>{busy ? 'Проверка…' : 'Войти'}</button>
      <p className="text-sm text-graphite/70">Доступ есть только у владельца сайта. Для восстановления пароля обратитесь к администратору.</p>
    </form> : <>
      <div className="sticky top-0 z-20 mb-6 flex flex-wrap items-center gap-3 border border-line bg-cream p-3 shadow-sm">
        <button onClick={publish} disabled={busy || !dirty} className={button}>{busy ? 'Подождите…' : 'Опубликовать изменения'}</button>
        <span className="text-sm">{dirty ? 'Есть изменения' : 'Всё сохранено'}</span>
        <button className={`${secondary} ml-auto`} disabled={busy} onClick={() => {
          if (dirty && !window.confirm('Выйти без публикации изменений?')) return;
          void run(async () => { try { await cmsRequest('/auth/v1/logout', token, { method: 'POST' }); } finally { setToken(''); setDirty(false); } });
        }}>Выйти</button>
      </div>
      <fieldset disabled={busy} className="min-w-0">
      <div className="mb-6 flex flex-wrap gap-2" aria-label="Разделы управления">
        {([['photos','Фотографии'],['logos','Логотипы'],['texts','Тексты']] as const).map(([key,label]) =>
          <button key={key} className={tab === key ? button : secondary} aria-pressed={tab === key} onClick={() => setTab(key)}>{label}</button>)}
      </div>
      {tab === 'photos' && <div className="space-y-5">
        <label className="block max-w-md">Категория изделия<select className={field} value={category} onChange={e => setCategory(e.target.value)}>{content.categories.map(c => <option key={c.slug} value={c.slug}>{ru.categories[c.slug].title}</option>)}</select></label>
        <p>Первое фото — обложка категории. Остальные появляются в её галерее. Фото в декоративных блоках главной страницы меняются отдельно в коде.</p>
        <label className="block rounded border border-dashed border-bordeaux p-5">Добавить фотографии с телефона или компьютера<input className="mt-3 block max-w-full" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { void addFiles(e.target.files, 'category'); e.target.value = ''; }} /><span className="mt-2 block text-sm">JPG, PNG или WEBP, до 8 МБ на фото.</span></label>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[...(selected.image ? [selected.image] : []), ...(selected.gallery ?? [])].map((src, index, all) => <div key={`${src}-${index}`} className="rounded border border-line bg-white p-3">
            <img src={src} alt={`${ru.categories[selected.slug].title}: фото ${index + 1}`} className="aspect-[3/4] w-full object-cover" />
            <p className="my-2 text-sm">{index === 0 ? 'Обложка категории' : `Фото ${index + 1}`}</p>
            <div className="flex flex-wrap gap-2">
              {index > 0 && <button className={secondary} onClick={() => { const next = [src, ...all.filter((_, i) => i !== index)]; setPhotos(next[0], next.slice(1)); }}>Сделать обложкой</button>}
              {index > 1 && <button className={secondary} onClick={() => { const next = [...all]; [next[index-1], next[index]] = [next[index], next[index-1]]; setPhotos(next[0], next.slice(1)); }}>Раньше</button>}
              <button className={secondary} onClick={() => { if (window.confirm('Убрать это фото из категории?')) { const next = all.filter((_,i) => i !== index); setPhotos(next[0] ?? null, next.slice(1)); } }}>Убрать</button>
            </div>
          </div>)}
        </div>
      </div>}
      {tab === 'logos' && <div className="grid gap-6 md:grid-cols-2">{(['production','brand'] as const).map(key => <div key={key} className="rounded border border-line bg-white p-5">
        <h2 className="text-xl">{key === 'production' ? 'Логотип производства' : 'Логотип бренда'}</h2>
        <p className="my-3 text-sm">{key === 'production' ? 'Шапка, подвал и страницы производства.' : 'Страница «О бренде».'}</p>
        <img src={content.logos[key]} alt={key === 'production' ? 'Логотип производства' : 'Логотип бренда'} className="h-48 w-full object-contain" />
        <label className="mt-4 block">Заменить логотип<input className="mt-2 block max-w-full" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { void addFiles(e.target.files, key); e.target.value = ''; }} /></label>
      </div>)}</div>}
      {tab === 'texts' && <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <label>Язык<select className={field} value={locale} onChange={e => setLocale(e.target.value as 'ru'|'en')}><option value="ru">Русский</option><option value="en">Английский</option></select></label>
          <label>Раздел<select className={field} value={section} onChange={e => setSection(e.target.value)}>{Array.from(new Set(Object.keys(defaultTexts[locale]).map(k => k.split('.')[0]))).map(k => <option key={k} value={k}>{sectionNames[k] ?? k}</option>)}</select></label>
          <label>Поиск по тексту<input type="search" className={field} value={search} onChange={e => setSearch(e.target.value)} /></label>
        </div>
        <p className="text-sm">Редактируйте текст в полях ниже. Русская и английская версии сохраняются отдельно; автоматического перевода нет.</p>
        {Object.entries(defaultTexts[locale]).filter(([path,value]) => path.startsWith(`${section}.`) && `${value} ${content.texts[locale][path] ?? ''}`.toLowerCase().includes(search.toLowerCase())).map(([path,value]) => <label key={`${locale}.${path}`} className="block rounded border border-line bg-white p-4">
          <span className="block text-sm text-graphite/70">{value.slice(0, 110)}{value.length > 110 ? '…' : ''}</span>
          <textarea className={field} rows={value.length > 150 ? 5 : 2} maxLength={10000} value={content.texts[locale][path] ?? value} onChange={e => change({ ...content, texts: { ...content.texts, [locale]: { ...content.texts[locale], [path]: e.target.value } } })} />
        </label>)}
      </div>}
      </fieldset>
    </>}
    <p role="status" aria-live="polite" className="mt-5 rounded bg-sand p-4 empty:hidden">{message}</p>
  </section>;
}
