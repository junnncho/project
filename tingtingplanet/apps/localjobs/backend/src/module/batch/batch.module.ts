import { BatchService } from "./batch.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [],
  providers: [BatchService],
  exports: [BatchService],
})
export class BatchModule {}
