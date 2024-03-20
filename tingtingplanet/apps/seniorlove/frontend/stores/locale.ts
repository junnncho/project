import { MainLocale, mainLocale } from "./main.locale";
// import { summaryLocale, SummaryLocale } from "./summary/summary.locale";
import { UserLocale, userLocale } from "./user/user.locale";
import { getPageProto, usePageProto } from "@shared/util-client";

export const locale = {
  main: mainLocale,
  // summary: summaryLocale,
  user: userLocale,
} as const;

export type Locale =
  | MainLocale
  // | SummaryLocale
  | UserLocale;

export const usePage = () => usePageProto<Locale>();
export const getPage = async () => await getPageProto<Locale>();
