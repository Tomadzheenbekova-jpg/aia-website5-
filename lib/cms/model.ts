import { cmsUrl } from './config';
import { categories, type Category } from '@/lib/categories';
import ru from '@/lib/i18n/dictionaries/ru';
import en from '@/lib/i18n/dictionaries/en';

export type Content = {
  logos: { production: string; brand: string };
  categories: Category[];
  texts: { ru: Record<string, string>; en: Record<string, string> };
};
export function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value };
  if (!value || typeof value !== 'object') return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, val]) =>
    Object.entries(flatten(val, prefix ? `${prefix}.${key}` : key))));
}
export const defaultTexts = { ru: flatten(ru), en: flatten(en) };
export const defaultContent: Content = {
  logos: { production: '/api/logo/production', brand: '/api/logo/brand' },
  categories,
  texts: { ru: {}, en: {} },
};
export function imageAllowed(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (value === '/api/logo/production' || value === '/api/logo/brand') return true;
  if (/^\/images\/[a-zA-Z0-9/_-]+\.(jpg|jpeg|png|webp)$/.test(value)) return true;
  const base = cmsUrl;
  if (!base) return false;
  try {
    const url = new URL(value);
    return url.origin === new URL(base).origin && url.pathname.startsWith('/storage/v1/object/public/aia-media/') && !url.search && !url.hash;
  } catch { return false; }
}
export function normalizeContent(raw: unknown): Content {
  const out: Content = JSON.parse(JSON.stringify(defaultContent));
  if (!raw || typeof raw !== 'object') return out;
  const data = raw as Partial<Content>;
  for (const key of ['production', 'brand'] as const) {
    const url = data.logos?.[key];
    if (imageAllowed(url)) out.logos[key] = url;
  }
  out.categories = categories.map(base => {
    const entry = Array.isArray(data.categories) ? data.categories.find(c => c?.slug === base.slug) : undefined;
    if (!entry) return base;
    return { ...base, image: entry.image === null ? null : imageAllowed(entry.image) ? entry.image : base.image,
      gallery: Array.isArray(entry.gallery) ? entry.gallery.filter(imageAllowed).slice(0, 30) : base.gallery };
  });
  for (const locale of ['ru', 'en'] as const) {
    for (const [path, value] of Object.entries(data.texts?.[locale] ?? {})) {
      if (Object.hasOwn(defaultTexts[locale], path) && typeof value === 'string' && value.length <= 10000) out.texts[locale][path] = value;
    }
  }
  return out;
}
export function applyTexts<T>(value: T, changes: Record<string, string>, prefix = ''): T {
  if (typeof value === 'string') return (changes[prefix] ?? value) as T;
  if (Array.isArray(value)) return value.map((v, i) => applyTexts(v, changes, `${prefix}.${i}`)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) =>
    [k, applyTexts(v, changes, prefix ? `${prefix}.${k}` : k)])) as T;
  return value;
}
