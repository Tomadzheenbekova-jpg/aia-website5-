import { getContent } from "@/lib/cms/server";
import { applyTexts } from "@/lib/cms/model";
import type { Locale } from "./config";
import type { Dictionary } from "./types";
import ru from "./dictionaries/ru";
import en from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { ru, en };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return applyTexts(dictionaries[locale] ?? dictionaries.ru, (await getContent()).texts[locale]);
}
