import { Global, Module, DynamicModule, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AdminAddScene } from './admin-scenes/admin.add.scene';
import { AdminBanScene } from './admin-scenes/admin.ban.scene';
import { AdminScene } from './admin-scenes/admin.scene';
import { AdminUnbanScene } from './admin-scenes/admin.unban.scene';
import { AdminWithdrawScene } from './admin-scenes/admin.withdraw.scene';
import { RealTimeService } from './realTime.service';
import { RealTimeUpdate } from './realTime.update';
import { MainScene } from './scenes/main.scene';
import { NormalReferralScene } from './scenes/normalReferral.scene';
import { SpecialReferralScene } from './scenes/specialReferral.scene';
import { StartScene } from './scenes/start.scene';
import { WithdrawConfirmScene } from './scenes/withdrawConfirm.scene';
import { WithdrawSetScene } from './scenes/withdrawSetting.scene';

@Global()
@Module({
  imports: [RealTimeUpdate],
  providers: [
    RealTimeService,
    MainScene,
    WithdrawSetScene,
    WithdrawConfirmScene,
    StartScene,
    NormalReferralScene,
    SpecialReferralScene,
    AdminScene,
    AdminWithdrawScene,
    AdminBanScene,
    AdminUnbanScene,
    AdminAddScene,
  ],
  exports: [RealTimeService],
})
export class RealTimeModule {}
