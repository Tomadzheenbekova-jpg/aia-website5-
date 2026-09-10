import type { Metadata } from "next";
import Section from "@/components/Section";
import CategoryImage from "@/components/CategoryImage";
import DetailGallery from "@/components/DetailGallery";
import Button from "@/components/Button";
import OrderForm from "@/components/OrderForm";
import { getCategories } from "@/lib/cms/server";
import { siteConfig } from "@/lib/site-config";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return { title: dict.collections.title, description: dict.collections.intro };
}

export default async function CollectionsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const categories = await getCategories();

  return (
    <>
      <Section>
        <h1 className="font-display text-4xl text-graphite">{dict.collections.title}</h1>
        <p className="mt-4 max-w-2xl font-sans text-graphite/80">{dict.collections.intro}</p>
      </Section>

      {categories.map((cat, i) => {
        const catDict = dict.categories[cat.slug];
        return (
          <Section key={cat.slug} id={cat.slug} tone={i % 2 === 0 ? "cream" : "sand"}>
            <div className={`grid gap-10 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <CategoryImage
                  src={cat.image}
                  alt={catDict.title}
                  placeholderLabel={dict.placeholders[cat.placeholderKind]}
                  aspect="aspect-[4/5]"
                />
                {cat.gallery && cat.gallery.length > 0 && (
                  <DetailGallery images={cat.gallery} altPrefix={catDict.title} />
                )}
              </div>
              <div>
                <h2 className="font-display text-3xl text-graphite">{catDict.title}</h2>
                <p className="mt-3 max-w-md font-sans text-graphite/80">{catDict.description}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {siteConfig.links.wildberries ? (
                    <Button href={siteConfig.links.wildberries} variant="primary" external>
                      {dict.collections.buyOnWb}
                    </Button>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center bg-line px-6 py-3 font-sans text-sm text-graphite/50">
                      {dict.collections.buyOnWb}
                    </span>
                  )}
                  <Button href="#zakaz" variant="secondary">{dict.collections.orderOnSite}</Button>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Section id="zakaz" tone="sand">
        <h2 className="font-display text-3xl text-graphite">{dict.collections.orderSectionTitle}</h2>
        <p className="mt-3 max-w-xl font-sans text-graphite/80">{dict.collections.orderSectionText}</p>
        <div className="mt-8 max-w-2xl">
          <OrderForm locale={locale} dict={dict} />
        </div>
      </Section>
    </>
  );
}
