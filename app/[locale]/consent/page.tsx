import type { Metadata } from "next";
import Section from "@/components/Section";
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
  return { title: dict.consent.title };
}

export default async function ConsentPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const { legal } = siteConfig;
  const c = dict.consent;

  return (
    <Section>
      <h1 className="font-display text-4xl text-graphite">{c.title}</h1>

      <div className="mt-8 max-w-2xl space-y-4 font-sans text-graphite/80">
        <p>{c.p1}</p>
        <p>
          {c.p2}{" "}
          <a href={`/${locale}/kontakty`} className="text-bordeaux underline underline-offset-2">
            {c.contactsLinkText}
          </a>
          .
        </p>

        <div className="border border-line bg-sand p-6 text-sm text-graphite/70">
          <p>{c.operatorLabel} {legal.personalDataOperator ?? dict.privacyPolicy.fillLater}</p>
        </div>
      </div>
    </Section>
  );
}
