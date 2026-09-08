import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

// Переключатель языка. currentPath — часть пути ПОСЛЕ префикса локали
// (например "/kollektsii" или "" для главной), чтобы при переключении
// языка посетитель оставался на той же странице.
export default function LocaleSwitcher({
  locale,
  pathWithoutLocale,
}: {
  locale: Locale;
  pathWithoutLocale: string;
}) {
  const options: { code: Locale; label: string }[] = [
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex items-center gap-1 font-sans text-xs">
      {options.map((opt, i) => (
        <span key={opt.code} className="flex items-center gap-1">
          {i > 0 && <span className="text-graphite/30">/</span>}
          {opt.code === locale ? (
            <span className="font-semibold text-graphite">{opt.label}</span>
          ) : (
            <Link
              href={`/${opt.code}${pathWithoutLocale}`}
              className="text-graphite/50 hover:text-bordeaux"
            >
              {opt.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
