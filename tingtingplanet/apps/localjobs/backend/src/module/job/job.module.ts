import * as Job from "./job.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobResolver } from "./job.resolver";
import { JobService } from "./job.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Job.name, useFactory: Job.middleware() }])],
  providers: [JobService, JobResolver],
  exports: [JobService],
})
export class JobModule {}
