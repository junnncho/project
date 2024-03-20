import { AdminSummary } from "../admin/admin.gql";
import { CurrencySummary } from "../currency/currency.gql";
import { Dayjs } from "dayjs";
import { Field, ObjectType } from "@shared/util-client";
import { FileSummary } from "../file/file.gql";
import { KeyringSummary } from "../keyring/keyring.gql";
import { NotificationSummary } from "../notification/notification.gql";
import { ProductSummary } from "../product/product.gql";
import { ThingSummary } from "../thing/thing.gql";
import { cnst } from "@shared/util";

@ObjectType("DefaultSummary")
export class DefaultSummary {
  @Field(() => String)
  type: cnst.PeriodType;
  @Field(() => Date)
  at: Dayjs;
  @Field(() => String)
  status: cnst.SummaryStatus;
}

export const summaries = [
  DefaultSummary,
  NotificationSummary,
  AdminSummary,
  CurrencySummary,
  FileSummary,
  KeyringSummary,
  ProductSummary,
  ThingSummary,
] as const;
export interface Summary
  extends DefaultSummary,
    AdminSummary,
    CurrencySummary,
    FileSummary,
    KeyringSummary,
    ProductSummary,
    ThingSummary,
    NotificationSummary {}
