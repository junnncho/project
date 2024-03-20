"use client";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePageProto = <Locale extends string>() => {
  const pathname = usePathname();
  // const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const path = pathname.split("/").slice(1).join("/");

  return {
    path,
    pathname,
    // params,
    searchParams,
    goto: (href: string, options?: NavigateOptions) => router.push(href, options),
    l: (key: Locale, param?: any) =>
      t.rich(key, {
        ...param,
        strong: (chunks: any) => <b>{chunks}</b>,
        br: <br />,
      }) as string,
    lang: locale,
    setLang: (lang: string) => router.push(`/${lang}/${path}?${searchParams.toString()}`),
  };
};
