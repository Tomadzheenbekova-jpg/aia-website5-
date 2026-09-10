/* eslint-disable @next/next/no-img-element */
import { getContent } from "@/lib/cms/server";
import type { Metadata } from "next";
import Section from "@/components/Section";
import CategoryImage from "@/components/CategoryImage";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return { title: dict.about.title, description: dict.about.intro1 };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const logo = (await getContent()).logos.brand;

  return (
    <>
      <Section>
        <img src={logo} alt="АЙА — бренд" className="mb-6 h-36 w-36 object-contain" />
          <h1 className="font-display text-4xl text-graphite">{dict.about.title}</h1>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="font-sans text-graphite/80">
            <p>{dict.about.intro1}</p>
            <p className="mt-4">{dict.about.intro2}</p>
          </div>
          <CategoryImage
            src="/images/categories/zhilety-01.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[4/5]"
          />
        </div>
      </Section>

      <Section tone="sand">
        <div className="max-w-2xl">
          <p className="font-sans text-sm text-bordeaux">{dict.about.capsuleEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-graphite">{dict.about.capsuleTitle}</h2>
          <p className="mt-4 font-sans text-graphite/80">{dict.about.capsuleText}</p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-6">
          <CategoryImage
            src="/images/categories/kapsula-01.jpg"
            alt={dict.categories.kurtki.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/kapsula-04.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/kapsula-05.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
          <CategoryImage
            src="/images/categories/bryuki-01.jpg"
            alt={dict.categories.bryuki.title}
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
          <CategoryImage
            src="/images/categories/zhilety-07.jpg"
            alt={dict.categories.zhilety.title}
            placeholderLabel={dict.placeholders.onModel}
            aspect="aspect-[3/4]"
            sizes="(min-width: 768px) 16vw, 33vw"
          />
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-3xl text-graphite">{dict.about.careTitle}</h2>
        <p className="mt-4 max-w-2xl font-sans text-graphite/80">{dict.about.careText}</p>
      </Section>
    </>
  );
}
