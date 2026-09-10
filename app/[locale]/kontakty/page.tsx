import type { Metadata } from "next";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { siteConfig, getWhatsAppLink } from "@/lib/site-config";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return { title: dict.contacts.title };
}

export default async function ContactsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const whatsappCis = getWhatsAppLink("cis");
  const whatsappEurope = getWhatsAppLink("europe");
  const { brand, links, contacts } = siteConfig;

  return (
    <Section>
      <h1 className="font-display text-4xl text-graphite">{dict.contacts.title}</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="font-sans text-graphite/80">
          <p className="font-medium text-graphite">{brand.name}</p>
          <p className="mt-2">
            {brand.city}, {brand.country}
            <br />
            {brand.productionAddress}
          </p>

          <ul className="mt-6 space-y-2">
            <li>
              {dict.contacts.phoneLabel}:{" "}
              {contacts.phones.length > 0 ? (
                <span className="inline-flex flex-col gap-1 align-top">
                  {contacts.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.number.replace(/\s/g, "")}`}
                      className="text-bordeaux hover:text-cocoa"
                    >
                      {phone.name}: {phone.number}
                    </a>
                  ))}
                </span>
              ) : (
                <span className="text-graphite/50">{dict.contacts.pending}</span>
              )}
            </li>
            <li>
              {dict.contacts.emailLabel}:{" "}
              {contacts.email ? (
                <a href={`mailto:${contacts.email}`} className="text-bordeaux hover:text-cocoa">
                  {contacts.email}
                </a>
              ) : (
                <span className="text-graphite/50">{dict.contacts.pending}</span>
              )}
            </li>
            <li>
              {dict.contacts.whatsappCisLabel}:{" "}
              {whatsappCis ? (
                <a href={whatsappCis} target="_blank" rel="noopener noreferrer" className="text-bordeaux hover:text-cocoa">
                  {dict.contacts.whatsappCta}
                </a>
              ) : (
                <span className="text-graphite/50">{dict.contacts.pending}</span>
              )}
            </li>
            <li>
              {dict.contacts.whatsappEuropeLabel}:{" "}
              {whatsappEurope ? (
                <a href={whatsappEurope} target="_blank" rel="noopener noreferrer" className="text-bordeaux hover:text-cocoa">
                  {dict.contacts.whatsappCta}
                </a>
              ) : (
                <span className="text-graphite/50">{dict.contacts.pending}</span>
              )}
            </li>
            <li>
              {dict.contacts.telegramLabel}:{" "}
              {links.telegramChannel ? (
                <a href={links.telegramChannel} target="_blank" rel="noopener noreferrer" className="text-bordeaux hover:text-cocoa">
                  {dict.contacts.telegramCta}
                </a>
              ) : (
                <span className="text-graphite/50">{dict.contacts.channelPending}</span>
              )}
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-sans text-graphite/80">{dict.contacts.formIntro}</p>
          <ContactForm locale={locale} dict={dict} />
        </div>
      </div>
    </Section>
  );
}
