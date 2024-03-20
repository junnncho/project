import * as Report from "./report.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReportResolver } from "./report.resolver";
import { ReportService } from "./report.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Report.name, useFactory: Report.middleware() }])],
  providers: [ReportService, ReportResolver],
  exports: [ReportService],
})
export class ReportModule {}
