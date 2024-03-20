import { Locale } from "@shared/util-client";

export const mainLocale = {
  keyring: {
    accountId: "아이디",
  },
};

export type MainLocale = Locale<"main", unknown, typeof mainLocale>;
