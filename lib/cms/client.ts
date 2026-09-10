import { cmsUrl as url, cmsKey as key } from './config';
export const cmsConfigured = Boolean(url && key);
export async function cmsRequest(path: string, token?: string, options: RequestInit = {}) {
  if (!cmsConfigured) throw new Error('Панель ещё не подключена к хранилищу.');
  const response = await fetch(`${url}${path}`, {
    ...options, cache: 'no-store', headers: {
      apikey: key!, ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body && typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error('Вход не выполнен или сеанс истёк. Войдите снова.');
    if (response.status === 403) throw new Error('У этой учётной записи нет права редактировать сайт.');
    if (response.status === 409) throw new Error('Сайт уже изменён в другом окне. Скопируйте свои правки, затем обновите страницу.');
    if (response.status === 429) throw new Error('Слишком много попыток. Попробуйте позже.');
    throw new Error('Операция не выполнена. Проверьте подключение и повторите попытку.');
  }
  return response.status === 204 ? null : response.json();
}
export async function uploadImage(file: File, token: string): Promise<string> {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Выберите JPG, PNG или WEBP. Фото HEIC сначала сохраните в JPG.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Размер фотографии должен быть не больше 8 МБ.');
  const bitmap = await createImageBitmap(file).catch(() => { throw new Error('Не удалось прочитать изображение.'); });
  if (bitmap.width > 12000 || bitmap.height > 12000) { bitmap.close(); throw new Error('Слишком большое разрешение изображения.'); }
  bitmap.close();
  const ext = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1];
  const path = `${crypto.randomUUID()}.${ext}`;
  await cmsRequest(`/storage/v1/object/aia-media/${path}`, token, { method: 'POST', body: file, headers: { 'Content-Type': file.type } });
  return `${url}/storage/v1/object/public/aia-media/${path}`;
}
