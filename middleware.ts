import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

// Определяет предпочитаемый язык по заголовку Accept-Language браузера.
// Если ни один поддерживаемый язык не найден — возвращает язык по умолчанию.
function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage.split(",").map((part) => part.split(";")[0].trim().toLowerCase());

  for (const lang of preferred) {
    const short = lang.slice(0, 2);
    if ((locales as readonly string[]).includes(short)) {
      return short;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропускаем статику, API-роуты и служебные файлы Next.js.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const currentLocale = pathname.split("/")[1];
    // Прокидываем локаль дальше как заголовок ЗАПРОСА (не ответа),
    // чтобы серверные компоненты могли прочитать её через headers().
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", currentLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Путь без локали ("/", "/kollektsii" и т.д.) — определяем язык
  // и редиректим на версию с префиксом локали.
  const locale = detectLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};
