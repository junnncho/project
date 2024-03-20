import { AdminLocale, adminLocale } from "./admin/admin.locale";
import { CurrencyLocale, currencyLocale } from "./currency/currency.locale";
import { FileLocale, fileLocale } from "./file/file.locale";
import { KeyringLocale, keyringLocale } from "./keyring/keyring.locale";
import { MainLocale, mainLocale } from "./main.locale";
import { NotificationLocale, notificationLocale } from "./notification/notification.locale";
import { ProductLocale, productLocale } from "./product/product.locale";
import { ThingLocale, thingLocale } from "./thing/thing.locale";
import { UserLocale, userLocale } from "./user/user.locale";
import { getPageProto, usePageProto } from "@shared/util-client";

export const locale = {
  main: mainLocale,
  admin: adminLocale,
  currency: currencyLocale,
  file: fileLocale,
  keyring: keyringLocale,
  notification: notificationLocale,
  product: productLocale,
  thing: thingLocale,
  user: userLocale,
} as const;

export type Locale =
  | MainLocale
  | AdminLocale
  | CurrencyLocale
  | FileLocale
  | KeyringLocale
  | NotificationLocale
  | ProductLocale
  | ThingLocale
  | UserLocale

export const usePage = () => usePageProto<Locale>();
export const getPage = async () => await getPageProto<Locale>();
