import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

// TODO: заменить на реальный домен после подключения.
const BASE_URL = "https://yes-today.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/o-brende",
    "/proizvodstvo",
    "/kollektsii",
    "/kontraktnoe-proizvodstvo",
    "/kontakty",
    "/privacy-policy",
    "/consent",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
