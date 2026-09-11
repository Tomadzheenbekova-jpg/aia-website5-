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
  logo,
}: {
  locale: Locale;
  dict: Dictionary;
  logo: string;
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
    <header className="border-b border-line bg-cream">
      <div className="border-b border-line bg-graphite">
        <Link
          href={`/${locale}`}
          className="mx-auto flex h-28 max-w-content items-center justify-center px-6 md:h-36"
          aria-label="АЙА — на главную"
        >
          <img
            src={logo}
            alt="АЙА — швейное производство в Кыргызстане"
            className="h-24 w-auto object-contain md:h-32"
          />
        </Link>
      </div>

      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5">
        <nav className="hidden gap-7 font-sans text-sm text-graphite md:flex">
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
