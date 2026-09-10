import { getContent } from "@/lib/cms/server";
import { Fraunces, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const fraunces = Fraunces({
  // Google Fonts не предоставляет кириллическое подмножество для Fraunces —
  // оставляем latin/latin-ext (кириллица не нужна: этот шрифт используется
  // только для крупных декоративных заголовков вроде "AIA", а кириллические
  // заголовки "АЙА" отрисовываются обычным текстом браузера, не через этот
  // шрифт-объект).
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

// Единственное место в проекте с тегами <html>/<body> — обязательное
// требование Next.js App Router (ровно один корневой layout).
// Локаль сюда попадает через заголовок x-locale, который выставляет
// middleware.ts на основе префикса пути ("/ru/..." или "/en/...").
// Так тег <html lang="..."> остаётся корректным для каждого языка,
// хотя сам корневой layout физически находится выше сегмента [locale].
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerLocale = headers().get("x-locale");
  const locale: Locale = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const content = await getContent();

  return (
    <html lang={locale} className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header locale={locale} dict={dict} logo={content.logos.production} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} logo={content.logos.production} />
      </body>
    </html>
  );
}
