import { Locale, baseLocale } from "@shared/util-client";

export const summaryLocale = {
  ...baseLocale,
} as const;

export type SummaryLocale = Locale<"summary", any, typeof summaryLocale>;
