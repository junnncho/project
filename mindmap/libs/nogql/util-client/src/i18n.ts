export const baseLocale = {
  status: ["Status", "상태"],
  id: ["Id", "아이디"],
  createdAt: ["CreatedAt", "등록일"],
  updatedAt: ["UpdatedAt", "수정일"],
  __ModelType__: ["__ModelType__", "__모델타입__"],
} as const;

const commonLocale = {
  lang: {
    ko: "KO",
    en: "EN",
    // zhChs: "简体中文", //간체
    // zhCht: "繁體中文", //번체
  },
};

export const getLocaleMessages = (locales: Record<string, any>[]) => {
  const resources = {
    ko: { ...commonLocale },
    en: { ...commonLocale },
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
    resources.ko = { ...resources.ko, ...koItem };
    resources.en = { ...resources.en, ...enItem };
  });
  return resources;
};
