import { Locale, baseLocale } from "@shared/util-client";
import { ServiceDesk, ServiceDeskSummary } from "./serviceDesk.gql";

export const serviceDeskLocale = {
  ...baseLocale,
  field: ["Field", "필드"],
  totalServiceDesk: ["Total ServiceDesk", "총 상담"],
} as const;

export type ServiceDeskLocale = Locale<"serviceDesk", ServiceDesk & ServiceDeskSummary, typeof serviceDeskLocale>;
