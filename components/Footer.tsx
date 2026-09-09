import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { brand, links, contacts } = siteConfig;
  const whatsappCis = getWhatsAppLink("cis");
  const whatsappEurope = getWhatsAppLink("europe");

  return (
    <footer className="border-t border-line bg-sand">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-14 font-sans text-sm text-graphite md:grid-cols-4">
        <div>
          <p className="font-display text-xl text-graphite">{brand.name}</p>
          <p className="mt-3 text-graphite/70">
            {brand.city}, {brand.country}
            <br />
            {brand.productionAddress}
          </p>
        </div>

        <div>
          <p className="mb-3 font-medium text-graphite">{dict.footer.sectionsTitle}</p>
          <ul className="space-y-2">
            <li><Link href={`/${locale}/kollektsii`} className="hover:text-bordeaux">{dict.nav.kollektsii}</Link></li>
            <li><Link href={`/${locale}/proizvodstvo`} className="hover:text-bordeaux">{dict.nav.proizvodstvo}</Link></li>
            <li><Link href={`/${locale}/kontraktnoe-proizvodstvo`} className="hover:text-bordeaux">{dict.nav.kontraktnoe}</Link></li>
            <li><Link href={`/${locale}/o-brende`} className="hover:text-bordeaux">{dict.nav.obrende}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-medium text-graphite">{dict.footer.contactsTitle}</p>
          <ul className="space-y-2">
            {contacts.phones.length > 0 && contacts.phones.map((p) => (
              <li key={p.number}>
                <a href={`tel:${p.number.replace(/\s/g, "")}`} className="hover:text-bordeaux">
                  {p.name}: {p.number}
                </a>
              </li>
            ))}
            {contacts.email && (
              <li><a href={`mailto:${contacts.email}`} className="hover:text-bordeaux">{contacts.email}</a></li>
            )}
            {whatsappCis && (
              <li><a href={whatsappCis} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">{dict.footer.whatsappCis}</a></li>
            )}
            {whatsappEurope && (
              <li><a href={whatsappEurope} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">{dict.footer.whatsappEurope}</a></li>
            )}
            {links.telegramChannel && (
              <li><a href={links.telegramChannel} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">{dict.footer.telegramChannel}</a></li>
            )}
            {contacts.phones.length === 0 && !contacts.email && !whatsappCis && !whatsappEurope && !links.telegramChannel && (
              <li className="text-graphite/50">{dict.footer.contactsEmpty}</li>
            )}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-medium text-graphite">{dict.footer.shopTitle}</p>
          {links.wildberries ? (
            <a
              href={links.wildberries}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-bordeaux px-4 py-2 text-cream hover:bg-cocoa"
            >
              {dict.nav.wbButton}
            </a>
          ) : (
            <p className="text-graphite/50">{dict.footer.wbPending}</p>
          )}
        </div>
      </div>

      <div className="border-t border-line px-6 py-5">
        <div className="mx-auto flex max-w-content flex-col gap-2 font-sans text-xs text-graphite/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-bordeaux">{dict.footer.privacyPolicy}</Link>
            <Link href={`/${locale}/consent`} className="hover:text-bordeaux">{dict.footer.consent}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
