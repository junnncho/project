import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { LogService } from '@nogql/util-server';
import { WithdrawListService } from '../waiting/waiting.service';
@Injectable()
export class BatchService extends LogService {
  constructor(private readonly withdrawListService: WithdrawListService) {
    super(BatchService.name);
  }

  // @Cron("*/30 * * * * *")
  // async withdrawLoop() {
  //   await this.withdrawListService.confirmWtihdrawList();
  // }

  // @Cron("0 0 */1 * * *")
  // async cleanWitdrawList() {
  //   this.logger.log("Cleaning withdrawList Start");
  //   await this.withdrawListService.cleanWithdrawList();
  //   this.logger.log("Cleaning withdrawList End");
  // }
}
