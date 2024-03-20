import * as Currency from "./currency.model";
import * as gql from "../gql";
import { Id, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { srv as external } from "@external/module";

@Injectable()
export class CurrencyService extends LoadService<Currency.Mdl, Currency.Doc, Currency.Input> {
  constructor(
    @InjectModel(Currency.name)
    private readonly Currency: Currency.Mdl,
  ) {
    super(CurrencyService.name, Currency);
  }
  async getDepositAddress(currencyId: Id) {
    return "0x0000000000000000000000000000000000000000";
  }

  async makeWithdrawal(currencyId: Id, amount: number) {
    // WIP
  }
  async withdraw(currencyId: Id, amount: number) {
    // WIP
  }
  async summarize(): Promise<gql.CurrencySummary> {
    return {
      totalCurrency: await this.Currency.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
