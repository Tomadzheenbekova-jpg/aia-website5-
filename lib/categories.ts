// ============================================================
// КАТЕГОРИИ ИЗДЕЛИЙ АЙА — только фото и структура.
// ============================================================
// Название и описание каждой категории живут в словарях переводов
// (lib/i18n/dictionaries/ru.ts и en.ts, ключ categories.<slug>),
// чтобы один и тот же список фото работал для обоих языков сайта.
// placeholderKind указывает, какую подпись плейсхолдера показывать,
// если фото ещё нет ("finished" или "onModel" — см. dict.placeholders).
// ============================================================

export type CategorySlug =
  | "bryuki"
  | "palazzo"
  | "rubashki"
  | "bluzki"
  | "yubki"
  | "zhilety"
  | "platya"
  | "zhakety"
  | "kurtki";

export type Category = {
  slug: CategorySlug;
  image: string | null;
  gallery?: string[];
  placeholderKind: "finished" | "onModel";
};

export const categories: Category[] = [
  {
    slug: "bryuki",
    image: "/images/categories/bryuki-01.jpg",
    gallery: [
      "/images/categories/bryuki-02.jpg",
      "/images/categories/bryuki-03.jpg",
      "/images/categories/bryuki-04.jpg",
      "/images/categories/bryuki-05.jpg",
      "/images/categories/bryuki-06.jpg",
      "/images/categories/bryuki-07.jpg",
    ],
    placeholderKind: "finished",
  },
  {
    slug: "palazzo",
    image: "/images/collections/palazzo-blue.jpg",
    gallery: [
      "/images/categories/palazzo-01.jpg",
      "/images/categories/palazzo-02.jpg",
      "/images/collections/palazzo-red-front.jpg",
      "/images/collections/palazzo-red-back.jpg",
      "/images/collections/palazzo-red-fastener.jpg",
    ],
    placeholderKind: "onModel",
  },
  {
    slug: "rubashki",
    image: "/images/collections/shirt-blue-clean.jpg",
    gallery: [
      "/images/collections/shirt-black-collage.jpg",
      "/images/collections/shirt-denim-black.jpg",
      "/images/collections/shirt-denim-blue-details.jpg",
      "/images/collections/shirt-blue-card.jpg",
      "/images/collections/shirt-red.jpg",
      "/images/collections/shirt-red-set.jpg",
      "/images/categories/rubashki-02.jpg",
      "/images/categories/rubashki-03.jpg",
      "/images/categories/rubashki-04.jpg",
    ],
    placeholderKind: "finished",
  },
  {
    slug: "bluzki",
    image: "/images/collections/blouse-black.jpg",
    gallery: ["/images/collections/blouse-polka-dot.jpg"],
    placeholderKind: "onModel",
  },
  {
    slug: "yubki",
    image: "/images/categories/yubki-01.jpg",
    placeholderKind: "finished",
  },
  {
    slug: "zhilety",
    image: "/images/collections/vest-black.jpg",
    gallery: [
      "/images/collections/vest-black-detail.jpg",
      "/images/collections/vest-red.jpg",
      "/images/collections/vest-plus-size.jpg",
      "/images/collections/vest-black-card.jpg",
      "/images/categories/zhilety-02.jpg",
      "/images/categories/zhilety-03.jpg",
      "/images/categories/zhilety-04.jpg",
      "/images/categories/zhilety-05.jpg",
      "/images/categories/zhilety-06.jpg",
      "/images/categories/zhilety-07.jpg",
      "/images/categories/zhilety-08.jpg",
      "/images/categories/zhilety-09.jpg",
    ],
    placeholderKind: "onModel",
  },
  {
    slug: "platya",
    image: "/images/collections/dress-burgundy.jpg",
    gallery: [
      "/images/categories/platya-02.jpg",
      "/images/categories/platya-03.jpg",
      "/images/categories/platya-04.jpg",
      "/images/categories/platya-05.jpg",
      "/images/categories/platya-06.jpg",
      "/images/categories/platya-07.jpg",
    ],
    placeholderKind: "onModel",
  },
  {
    slug: "zhakety",
    image: "/images/collections/vest-plus-size.jpg",
    placeholderKind: "finished",
  },
  {
    slug: "kurtki",
    image: "/images/categories/kurtki-02.jpg",
    gallery: [
      "/images/categories/kurtki-01.jpg",
      "/images/categories/kurtki-03.jpg",
      "/images/categories/kurtki-04.jpg",
      "/images/categories/kurtki-05.jpg",
      "/images/categories/kurtki-06.jpg",
      "/images/categories/kurtki-07.jpg",
      "/images/categories/kurtki-08.jpg",
    ],
    placeholderKind: "finished",
  },
];
