import * as DepositList from "./depositList.model";
import * as WithdrawList from "./withdrawList.model";
import { DepositListService, WithdrawListService } from "./waiting.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DepositList.name, useFactory: DepositList.middleware() },
      { name: WithdrawList.name, useFactory: WithdrawList.middleware() },
    ]),
  ],
  providers: [DepositListService, WithdrawListService],
  exports: [DepositListService, WithdrawListService],
})
export class WaitingModule {}
