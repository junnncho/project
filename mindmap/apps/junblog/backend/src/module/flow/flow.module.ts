import * as Flow from './flow.model';
import { FlowController } from './flow.controller';
import { FlowService } from './flow.service';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Flow.name, useFactory: Flow.middleware() }])],
  controllers: [FlowController],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {}
