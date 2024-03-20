
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { LogService } from "@shared/util-server";
import { srv as external } from "@external/module";
@Injectable()
export class SharedBatchService extends LogService implements OnModuleInit {
  constructor(
    private readonly pubsubService: external.PubsubService
  ) {
    super(SharedBatchService.name);
  }
  async onModuleInit() {
  }
  @Interval(10000)
  pubPing() {
    this.logger.verbose("Ping Published");
    this.pubsubService.ping();
  }
}
