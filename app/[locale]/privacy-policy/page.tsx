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
  return { title: dict.privacyPolicy.title };
}

export default async function PrivacyPolicyPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const { legal } = siteConfig;
  const pp = dict.privacyPolicy;

  return (
    <Section>
      <h1 className="font-display text-4xl text-graphite">{pp.title}</h1>

      <div className="mt-8 max-w-2xl space-y-4 font-sans text-graphite/80">
        <p>{pp.p1}</p>
        <p>{pp.p2}</p>

        <div className="border border-line bg-sand p-6 text-sm">
          <p className="font-medium text-graphite">{pp.legalTitle}</p>
          <ul className="mt-3 space-y-1 text-graphite/70">
            <li>{pp.entityName}: {legal.entityName ?? pp.fillLater}</li>
            <li>{pp.inn}: {legal.inn ?? pp.fillLater}</li>
            <li>{pp.registrationNumber}: {legal.registrationNumber ?? pp.fillLater}</li>
            <li>{pp.legalAddress}: {legal.legalAddress ?? pp.fillLater}</li>
            <li>{pp.operator}: {legal.personalDataOperator ?? pp.fillLater}</li>
          </ul>
          <p className="mt-3 text-xs text-graphite/50">{pp.pendingNote}</p>
        </div>
      </div>
    </Section>
  );
}
