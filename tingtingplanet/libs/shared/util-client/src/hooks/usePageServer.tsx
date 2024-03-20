import { redirect } from "next/navigation";

export const getPageProto = async <Locale extends string>() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const intl = require("next-intl/server");
  const locale = intl.getLocale();
  const t = await intl.getTranslations();
  return {
    // path,
    // pathname,
    // params,
    // searchParams,
    goto: (href: string) => redirect(href),
    l: (key: Locale, param?: any) => t(key, param),
    lang: locale,
  };
};
