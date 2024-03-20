import { Cron } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { LogService } from "@shared/util-server";
// import { SummaryService } from "../summary/summary.service";

@Injectable()
export class BatchService extends LogService {
  constructor() {
    // private readonly summaryService: SummaryService
    super(BatchService.name);
  }
  @Cron("0 * * * *")
  async takePeriodicSnapshot() {
    // this.logger.verbose(`Taking summary of database...`);
    // await this.summaryService.getSummary();
    // this.logger.verbose(`Taking summary of database finished`);
  }
}
