import { useEffect } from "react";
import i18n from "i18next";
import ICU from "i18next-icu";
import { initReactI18next, Trans } from "react-i18next";
import { NextComponentType } from "next";
import i18next from "i18next";

type Props = {
  Component: NextComponentType;
  locales: Record<string, any>[];
  defaultLng?: "ko" | "en" | "zhChs" | "zhCht";
};
export const baseLocale = {
  status: ["Status", "상태"],
  id: ["Id", "아이디"],
  createdAt: ["CreatedAt", "생성일"],
  updatedAt: ["UpdatedAt", "수정일"],
} as const;

export const useI18n = ({ Component, locales, defaultLng = "en" }: Props) => {
  const resources = {
    common: {
      translation: {
        lang: {
          ko: "한국어",
          en: "English",
          // zhChs: "简体中文", //간체
          // zhCht: "繁體中文", //번체
        },
      },
    },
    ko: { translation: {} },
    en: { translation: {} },
  };
  const koItem = {};
  const enItem = {};
  locales.forEach((locale) => {
    Object.keys(locale).forEach((key) => {
      if (!(key in koItem)) koItem[key] = {};
      if (!(key in enItem)) enItem[key] = {};
      Object.keys(locale[key]).forEach((innerKey) => {
        koItem[key][innerKey] = locale[key][innerKey][1];
        enItem[key][innerKey] = locale[key][innerKey][0];
      });
    });

    resources.ko.translation = { ...resources.ko.translation, ...koItem };
    resources.en.translation = { ...resources.en.translation, ...enItem };
  });

  i18n.use(ICU).use(initReactI18next).init({
    resources,
    keySeparator: ".",
    lng: defaultLng,
    fallbackLng: defaultLng,
  });

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [Component]);
};
export const makeLocale = <Locale extends string>() => {
  return {
    l: (key: Locale, param?: any) => Trans({ i18nKey: key, value: param }) as unknown as string,
    lang: i18next.language,
    setLang: (lang: "en" | "ko") => i18next.changeLanguage(lang),
  };
};
