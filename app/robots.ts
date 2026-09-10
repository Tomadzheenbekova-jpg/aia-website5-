import type { MetadataRoute } from "next";

const BASE_URL = "https://yes-today.example"; // TODO: заменить на реальный домен

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
