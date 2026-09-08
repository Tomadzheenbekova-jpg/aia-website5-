import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import Button from "@/components/Button";
import PlaceholderImage from "@/components/PlaceholderImage";
import CategoryImage from "@/components/CategoryImage";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site-config";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <>
      {/* Первый экран: позиционирование, без перегрузки текстом */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-display text-3xl leading-none text-graphite md:text-4xl">
              {siteConfig.brand.name}
              <span className="ml-3 text-bordeaux">{siteConfig.brand.nameEn}</span>
            </p>
            <p className="mt-3 font-sans text-sm text-bordeaux">{dict.home.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-graphite md:text-5xl">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-md font-sans text-graphite/80">{dict.home.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`${base}/kollektsii`} variant="primary">{dict.home.ctaCollection}</Button>
              <Button href={`${base}/proizvodstvo`} variant="secondary">{dict.home.ctaProduction}</Button>
            </div>
          </div>
          <CategoryImage
            src="/images/categories/kurtki-02.jpg"
            alt={dict.categories.kurtki.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[4/5]"
            priority
          />
        </div>
      </section>

      {/* Категории */}
      <Section>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl text-graphite">{dict.home.categoriesTitle}</h2>
          <Link href={`${base}/kollektsii`} className="font-sans text-sm text-bordeaux hover:text-cocoa">
            {dict.home.allCollections}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[...categories]
            .sort((a, b) => Number(b.image !== null) - Number(a.image !== null))
            .slice(0, 4)
            .map((cat) => (
            <Link key={cat.slug} href={`${base}/kollektsii#${cat.slug}`} className="group">
              <CategoryImage
                src={cat.image}
                alt={dict.categories[cat.slug].title}
                placeholderLabel={dict.placeholders[cat.placeholderKind]}
                aspect="aspect-[3/4]"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <p className="mt-3 font-sans text-sm text-graphite group-hover:text-bordeaux">
                {dict.categories[cat.slug].title}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Капсульный гардероб — все вещи сочетаются друг с другом */}
      <Section tone="sand">
        <div className="max-w-2xl">
          <p className="font-sans text-sm text-bordeaux">{dict.home.capsuleEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-graphite">{dict.home.capsuleTitle}</h2>
          <p className="mt-4 font-sans text-graphite/80">{dict.home.capsuleText}</p>
          <Button href={`${base}/kollektsii`} variant="ghost" className="mt-5">
            {dict.home.capsuleCta}
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-6">
          <CategoryImage
            src="/images/categories/kapsula-02.jpg"
            alt={dict.categories.kurtki.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/kapsula-03.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/kapsula-06.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/zhilety-07.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/kapsula-07.jpg"
            alt={dict.categories.rubashki.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/rubashki-01.jpg"
            alt={dict.categories.rubashki.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
        </div>
      </Section>

      {/* Платья */}
      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <CategoryImage
            src="/images/categories/platya-01.jpg"
            alt={dict.categories.platya.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[4/3]"
          />
          <div>
            <h2 className="font-display text-3xl text-graphite">{dict.home.dressesTitle}</h2>
            <p className="mt-4 max-w-md font-sans text-graphite/80">{dict.home.dressesText}</p>
            <Button href={`${base}/kollektsii`} variant="ghost" className="mt-5">
              {dict.home.seeCollectionArrow}
            </Button>
          </div>
        </div>
      </Section>

      {/* Широкие брюки и палаццо */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl text-graphite">{dict.home.palazzoTitle}</h2>
            <p className="mt-4 max-w-md font-sans text-graphite/80">{dict.home.palazzoText}</p>
            <Button href={`${base}/kollektsii`} variant="ghost" className="mt-5">
              {dict.home.seeCollectionArrow}
            </Button>
          </div>
          <CategoryImage
            src="/images/categories/palazzo-01.jpg"
            alt={dict.categories.palazzo.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[4/3]"
          />
        </div>
      </Section>

      {/* О бренде — короткий блок */}
      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <PlaceholderImage label={dict.placeholders.workshop} aspect="aspect-[4/3]" />
          <div>
            <h2 className="font-display text-3xl text-graphite">{dict.home.productionTitle}</h2>
            <p className="mt-4 font-sans text-graphite/80">{dict.home.productionText}</p>
            <Button href={`${base}/proizvodstvo`} variant="ghost" className="mt-5">
              {dict.home.productionCta}
            </Button>
          </div>
        </div>
      </Section>

      {/* Контрактное производство */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl text-graphite">{dict.home.contractTitle}</h2>
            <p className="mt-4 max-w-md font-sans text-graphite/80">{dict.home.contractText}</p>
            <Button href={`${base}/kontraktnoe-proizvodstvo`} variant="primary" className="mt-5">
              {dict.home.contractCta}
            </Button>
          </div>
          <PlaceholderImage label={dict.placeholders.sewingProcess} aspect="aspect-[4/3]" />
        </div>
      </Section>

      {/* Переход в магазин */}
      <Section tone="sand">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-graphite">{dict.home.whereToBuyTitle}</h2>
            <p className="mt-3 font-sans text-graphite/80">{dict.home.whereToBuyText}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {siteConfig.links.wildberries ? (
              <Button href={siteConfig.links.wildberries} variant="primary" external>
                {dict.home.buyOnWb}
              </Button>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center bg-line px-6 py-3 font-sans text-sm text-graphite/50">
                {dict.home.buyOnWb}
              </span>
            )}
            <Button href={`${base}/kollektsii`} variant="secondary">{dict.home.orderOnSite}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
