import * as SpecialReferral from "./specialReferral.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SpecialReferralService } from "./specialReferral.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: SpecialReferral.name, useFactory: SpecialReferral.middleware() }])],
  providers: [SpecialReferralService],
  exports: [SpecialReferralService],
})
export class SpecialReferralModule {}
