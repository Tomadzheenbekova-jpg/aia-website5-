import type { Metadata } from "next";
import { locales, isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL("https://yes-today.example"), // TODO: заменить на реальный домен после подключения
    title: {
      default: dict.meta.homeTitle,
      template: `%s — АЙА (AIA)`,
    },
    description: dict.meta.homeDescription,
    alternates: {
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

// Этот layout больше не рендерит <html>/<body> (это делает корневой
// app/layout.tsx — Next.js допускает только один такой layout).
// Здесь остаётся только generateMetadata/generateStaticParams для
// сегмента [locale]; шапка и подвал сайта подключены в корневом layout.
export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
