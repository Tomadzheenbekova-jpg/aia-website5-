// ============================================================
// Конфигурация языков сайта.
// ============================================================
// locales — поддерживаемые языки, defaultLocale — язык по умолчанию
// (используется, когда посетитель заходит на "/" без указания языка).
// Чтобы добавить новый язык, впишите его код сюда и создайте
// соответствующий файл словаря в lib/i18n/dictionaries/.
// ============================================================

export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
