import * as Summary from "./summary.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SummaryResolver } from "./summary.resolver";
import { SummaryService } from "./summary.service";

@Global()
@Module({})
export class SummaryModule {
  static register(isRoot?: boolean) {
    return {
      module: SummaryModule,
      imports: [MongooseModule.forFeatureAsync([{ name: Summary.name, useFactory: Summary.middleware() }])],
      providers: [SummaryService, SummaryResolver],
      exports: isRoot ? [SummaryService] : [SummaryService],
    };
  }
}
