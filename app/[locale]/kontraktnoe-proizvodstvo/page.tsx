import type { Metadata } from "next";
import Section from "@/components/Section";
import PlaceholderImage from "@/components/PlaceholderImage";
import ContractForm from "@/components/ContractForm";
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
  return { title: dict.contract.title, description: dict.contract.formIntro };
}

export default function ContractProductionPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="font-display text-4xl text-graphite">{dict.contract.title}</h1>
            <p className="mt-4 font-sans text-graphite/80">{siteConfig.contractProduction.direction}</p>
            <p className="mt-3 font-sans text-graphite/80">
              {dict.contract.minBatchPrefix} {siteConfig.contractProduction.minBatch} {dict.contract.minBatchSuffix}
            </p>
            <p className="mt-3 font-sans text-graphite/70">{dict.contract.negotiateNote}</p>
          </div>
          <PlaceholderImage label={dict.placeholders.sewingProcess} aspect="aspect-[4/3]" />
        </div>
      </Section>

      <Section tone="sand">
        <h2 className="font-display text-3xl text-graphite">{dict.contract.formTitle}</h2>
        <p className="mt-3 max-w-xl font-sans text-graphite/80">{dict.contract.formIntro}</p>
        <div className="mt-8 max-w-2xl">
          <ContractForm locale={locale} dict={dict} />
        </div>
      </Section>
    </>
  );
}
