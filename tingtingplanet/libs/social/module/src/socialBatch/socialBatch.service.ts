import { Injectable } from "@nestjs/common";
import { LogService } from "@shared/util-server";

@Injectable()
export class SocialBatchService extends LogService {
  constructor() {
    super(SocialBatchService.name);
  }
  // @Cron("*/5 * * * *")
  // async checkHoldUsers() {
  //   await this.listingService.expireListingsAll();
  // }
}
