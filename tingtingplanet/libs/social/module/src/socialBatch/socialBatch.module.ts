import { Global, Module } from "@nestjs/common";
import { SocialBatchService } from "./socialBatch.service";

@Global()
@Module({
  imports: [],
  providers: [SocialBatchService],
  exports: [SocialBatchService],
})
export class SocialBatchModule {}
