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

// Эти фотографии перенесены в другие категории или удалены по запросу владельца.
// Исключения также применяются к ранее сохранённым галереям редактора.
export const excludedCategoryImages: Partial<Record<CategorySlug, string[]>> = {
  "bryuki": [
    "/images/collections/shorts-black.webp",
    "/images/collections/capsule-red-set.webp"
  ],
  "rubashki": [
    "/images/collections/shirt-white-look.webp",
    "/images/collections/shirt-denim-cuff.webp"
  ],
  "zhilety": [
    "/images/collections/vest-black-look.webp",
    "/images/collections/vest-black-card.jpg"
  ],
  "zhakety": [
    "/images/collections/jacket-grey-look.webp"
  ]
};

export const categories: Category[] = [
  {
    "slug": "bryuki",
    "image": "/images/categories/bryuki-01.jpg",
    "gallery": [
      "/images/categories/bryuki-02.jpg",
      "/images/categories/bryuki-03.jpg",
      "/images/categories/bryuki-04.jpg",
      "/images/categories/bryuki-05.jpg",
      "/images/categories/bryuki-06.jpg",
      "/images/categories/bryuki-07.jpg",
      "/images/collections/trousers-black-card.webp",
      "/images/collections/trousers-red-plus.webp",
      "/images/collections/trousers-red-elastic-collage.webp",
      "/images/collections/trousers-red-length.webp",
      "/images/collections/trousers-red-waist.webp",
      "/images/collections/trousers-size-chart.webp"
    ],
    "placeholderKind": "finished"
  },
  {
    "slug": "palazzo",
    "image": "/images/collections/palazzo-blue.jpg",
    "gallery": [
      "/images/categories/palazzo-01.jpg",
      "/images/categories/palazzo-02.jpg",
      "/images/collections/palazzo-red-front.jpg",
      "/images/collections/palazzo-red-back.jpg",
      "/images/collections/palazzo-red-fastener.jpg",
      "/images/collections/palazzo-red-plus.webp",
      "/images/collections/palazzo-denim-styling.webp",
      "/images/collections/palazzo-denim-navy.webp",
      "/images/collections/palazzo-denim-pockets.webp",
      "/images/collections/palazzo-denim-velcro-card.webp",
      "/images/collections/palazzo-black-lace.webp"
    ],
    "placeholderKind": "onModel"
  },
  {
    "slug": "rubashki",
    "image": "/images/collections/shirt-blue-clean.jpg",
    "gallery": [
      "/images/collections/shirt-black-collage.jpg",
      "/images/collections/shirt-denim-black.jpg",
      "/images/collections/shirt-denim-blue-details.jpg",
      "/images/collections/shirt-blue-card.jpg",
      "/images/collections/shirt-red.jpg",
      "/images/collections/shirt-red-set.jpg",
      "/images/categories/rubashki-02.jpg",
      "/images/categories/rubashki-03.jpg",
      "/images/categories/rubashki-04.jpg",
      "/images/collections/shirt-white-collage.webp",
      "/images/collections/shirt-denim-grey-back.webp",
      "/images/collections/shirt-white-skirt-outfit.webp",
      "/images/collections/shirt-white-trousers-outfit.webp"
    ],
    "placeholderKind": "finished"
  },
  {
    "slug": "bluzki",
    "image": "/images/collections/blouse-black.jpg",
    "gallery": [
      "/images/collections/blouse-polka-dot.jpg",
      "/images/collections/blouse-white-look.webp",
      "/images/collections/blouse-polka-dot-card.webp",
      "/images/collections/blouse-brown-card.webp",
      "/images/collections/blouse-red.webp"
    ],
    "placeholderKind": "onModel"
  },
  {
    "slug": "yubki",
    "image": "/images/categories/yubki-01.jpg",
    "gallery": [
      "/images/collections/skirt-denim-card.webp",
      "/images/collections/shorts-black.webp",
      "/images/collections/shirt-white-look.webp",
      "/images/collections/vest-black-look.webp",
      "/images/collections/jacket-grey-look.webp",
      "/images/collections/skirt-grey-back.webp",
      "/images/collections/skirt-berry.webp"
    ],
    "placeholderKind": "finished"
  },
  {
    "slug": "zhilety",
    "image": "/images/collections/vest-black.jpg",
    "gallery": [
      "/images/collections/vest-black-detail.jpg",
      "/images/collections/vest-red.jpg",
      "/images/collections/vest-plus-size.jpg",
      "/images/categories/zhilety-02.jpg",
      "/images/categories/zhilety-03.jpg",
      "/images/categories/zhilety-04.jpg",
      "/images/categories/zhilety-05.jpg",
      "/images/categories/zhilety-06.jpg",
      "/images/categories/zhilety-07.jpg",
      "/images/categories/zhilety-08.jpg",
      "/images/categories/zhilety-09.jpg"
    ],
    "placeholderKind": "onModel"
  },
  {
    "slug": "platya",
    "image": "/images/collections/dress-burgundy.jpg",
    "gallery": [
      "/images/categories/platya-01.jpg",
      "/images/categories/platya-02.jpg",
      "/images/categories/platya-03.jpg",
      "/images/categories/platya-04.jpg",
      "/images/categories/platya-05.jpg",
      "/images/categories/platya-06.jpg",
      "/images/categories/platya-07.jpg",
      "/images/collections/dress-lace-black.webp",
      "/images/collections/dress-cutout-black.webp",
      "/images/collections/dress-ribbed-black.webp",
      "/images/collections/dress-red.webp"
    ],
    "placeholderKind": "onModel"
  },
  {
    "slug": "zhakety",
    "image": "/images/categories/kurtki-02.jpg",
    "gallery": [
      "/images/collections/jacket-blue-suit.webp",
      "/images/categories/kurtki-01.jpg",
      "/images/categories/kurtki-03.jpg",
      "/images/categories/kurtki-04.jpg",
      "/images/categories/kurtki-05.jpg",
      "/images/categories/kurtki-06.jpg",
      "/images/categories/kurtki-07.jpg",
      "/images/categories/kurtki-08.jpg",
      "/images/collections/bomber-blue-card.webp",
      "/images/collections/bomber-black-card.webp",
      "/images/collections/jacket-denim-full-look.webp"
    ],
    "placeholderKind": "finished"
  }
];
