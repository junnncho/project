import * as gql from "../gql";
import { Allow, BaseResolver } from "@shared/util-server";
import { CurrencyService } from "./currency.service";
import { FileService } from "../file/file.service";
import { Resolver } from "@nestjs/graphql";

@Resolver(() => gql.Currency)
export class CurrencyResolver extends BaseResolver(
  gql.Currency,
  gql.CurrencyInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(private readonly currencyService: CurrencyService, private readonly fileService: FileService) {
    super(currencyService);
  }
}
