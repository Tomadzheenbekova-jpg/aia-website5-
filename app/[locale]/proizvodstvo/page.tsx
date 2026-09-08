import type { Metadata } from "next";
import Section from "@/components/Section";
import PlaceholderImage from "@/components/PlaceholderImage";
import Button from "@/components/Button";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  return { title: dict.production.title, description: dict.production.intro };
}

export default function ProductionPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const base = `/${locale}`;
  const p = dict.production;

  return (
    <>
      <Section>
        <h1 className="font-display text-4xl text-graphite">{p.title}</h1>
        <p className="mt-4 max-w-2xl font-sans text-graphite/80">{p.intro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PlaceholderImage label={dict.placeholders.workshop} />
          <PlaceholderImage label={dict.placeholders.sewingProcess} />
          <PlaceholderImage label={dict.placeholders.sewingProcess} />
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="font-sans text-graphite/80">{p.equipmentText}</p>
          <p className="font-sans text-graphite/80">{p.fabricText}</p>
          <p className="font-sans text-graphite/80">{p.batchText}</p>
          <p className="font-sans text-graphite/80">{p.leadTimeText}</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-graphite">{p.qualityTitle}</h2>
            <p className="mt-3 font-sans text-graphite/80">{p.qualityText}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-graphite">{p.quoteTitle}</h2>
            <p className="mt-3 font-sans text-graphite/80">{p.quoteText}</p>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <h2 className="font-display text-3xl text-graphite">{p.ctaTitle}</h2>
        <p className="mt-3 max-w-xl font-sans text-graphite/80">{p.ctaText}</p>
        <Button href={`${base}/kontraktnoe-proizvodstvo`} variant="primary" className="mt-6">
          {p.contractCta}
        </Button>
      </Section>
    </>
  );
}
