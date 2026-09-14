/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const wbLink = siteConfig.links.wildberries;
  const pathname = usePathname();
  // Убираем префикс локали ("/ru" или "/en") из текущего пути, чтобы
  // переключатель языка вёл на ту же страницу на другом языке.
  const pathWithoutLocale = pathname.replace(/^\/(ru|en)/, "") || "";

  const navLinks = [
    { href: `/${locale}/kollektsii`, label: dict.nav.kollektsii },
    { href: `/${locale}/proizvodstvo`, label: dict.nav.proizvodstvo },
    { href: `/${locale}/kontraktnoe-proizvodstvo`, label: dict.nav.kontraktnoe },
    { href: `/${locale}/o-brende`, label: dict.nav.obrende },
    { href: `/${locale}/kontakty`, label: dict.nav.kontakty },
  ];

  return (
    <header className="sticky -top-28 z-40 border-b border-line bg-cream shadow-sm md:-top-36">
      <div className="h-28 bg-bordeaux md:h-36">
        <Link
          href={`/${locale}`}
          className="mx-auto flex h-28 max-w-content flex-col items-center justify-center px-6 text-center text-cream md:h-36"
          aria-label="АЙА — на главную"
        >
          <span className="font-display text-5xl tracking-[0.3em] md:text-7xl md:tracking-[0.45em]">AYA</span>
          <span className="mt-2 font-sans text-[10px] tracking-[0.35em] text-cream/80 md:text-xs md:tracking-[0.55em]">
            MADE IN KYRGYZSTAN
          </span>
        </Link>
      </div>

      <div className="mx-auto hidden max-w-content items-center justify-between gap-5 px-6 py-5 md:flex">
        <nav className="flex flex-wrap gap-x-7 gap-y-2 font-sans text-sm text-graphite">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-bordeaux">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {!pathname.startsWith("/admin") && <LocaleSwitcher locale={locale} pathWithoutLocale={pathWithoutLocale} />}
          {wbLink ? (
            <a
              href={wbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shop-button inline-flex px-5 py-2.5 font-sans text-sm"
            >
              {dict.nav.wbButton}
            </a>
          ) : (
            <span
              className="inline-flex cursor-not-allowed bg-line px-5 py-2.5 font-sans text-sm text-graphite/50"
              title="Link coming soon"
            >
              {dict.nav.wbButton}
            </span>
          )}
        </div>
      </div>

      {/* Мобильная навигация — простой видимый список без скрытого меню-гамбургера,
          чтобы разделы были доступны на телефоне без лишних действий */}
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-6 py-3 font-sans text-sm text-graphite md:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-bordeaux">
            {link.label}
          </Link>
        ))}
        {!pathname.startsWith("/admin") && <LocaleSwitcher locale={locale} pathWithoutLocale={pathWithoutLocale} />}
      </nav>
    </header>
  );
}
