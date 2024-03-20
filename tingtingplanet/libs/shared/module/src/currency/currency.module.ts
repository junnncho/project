import * as Currency from "./currency.model";
import { CurrencyResolver } from "./currency.resolver";
import { CurrencyService } from "./currency.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Currency.name, useFactory: Currency.middleware() }])],
  providers: [CurrencyService, CurrencyResolver],
  exports: [CurrencyService],
})
export class CurrencyModule {}
