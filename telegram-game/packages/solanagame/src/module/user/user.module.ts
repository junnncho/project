import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as User from './user.model';
import * as SpecialReferral from './specialReferral.model';
import { SpecialReferralService, UserService } from './user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: User.name, useFactory: User.middleware() },
      { name: SpecialReferral.name, useFactory: SpecialReferral.middleware() },
    ]),
  ],
  providers: [UserService, SpecialReferralService],
  exports: [UserService, SpecialReferralService],
})
export class UserModule {}
