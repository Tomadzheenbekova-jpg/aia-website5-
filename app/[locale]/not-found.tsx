import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale } from "@/lib/i18n/config";

// Файл not-found.tsx в App Router не получает params динамического
// сегмента, поэтому используем язык по умолчанию.
export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);

  return (
    <div className="mx-auto flex max-w-content flex-col items-start px-6 py-24">
      <p className="font-sans text-sm text-bordeaux">{dict.notFound.code}</p>
      <h1 className="mt-3 font-display text-4xl text-graphite">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-md font-sans text-graphite/80">{dict.notFound.text}</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-8 inline-flex items-center justify-center bg-bordeaux px-6 py-3 font-sans text-sm text-cream hover:bg-cocoa"
      >
        {dict.notFound.home}
      </Link>
    </div>
  );
}
