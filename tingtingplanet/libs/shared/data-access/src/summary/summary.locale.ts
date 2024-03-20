import { Locale, baseLocale } from "@shared/util-client";

export const summaryLocale = {
  ...baseLocale,
};

export type SummaryLocale = Locale<"summary", any, typeof summaryLocale>;
