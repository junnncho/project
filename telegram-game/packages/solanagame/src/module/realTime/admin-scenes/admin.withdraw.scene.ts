import { UseFilters, UseGuards } from '@nestjs/common';
import { Utils } from '@shared/util';
import { LogService } from '@shared/util-server';
import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  Hears,
  On,
  Ctx,
  Message,
  Sender,
} from 'nestjs-telegraf';
import {
  AdminGuard,
  RootGuard,
} from 'packages/solanagame/src/middlewares/adminGuard';
import { TelegrafExceptionFilter } from 'packages/solanagame/src/middlewares/exceptionHandler';
import { Scenes } from 'telegraf';
import { ContractService } from '../../contract/contract.service';
import { UserService } from '../../user/user.service';
import { DepositListService } from '../../waiting/waiting.service';
// import { SceneContext } from 'telegraf/typings/scenes';
import { AdminMenu, BackMenu, WithdrawMenu } from '../realTime.front';
import { messageForm, withdrawConfirmMessage } from '../realTime.message';
import { RealTimeService } from '../realTime.service';

@UseFilters(TelegrafExceptionFilter)
@Scene('admin-withdraw')
export class AdminWithdrawScene extends LogService {
  constructor(
    private readonly contractService: ContractService,
    private readonly userService: UserService,
    private readonly depositService: DepositListService
  ) {
    super(AdminWithdrawScene.name);
  }
  @SceneEnter()
  async onSceneEnter(
    @Ctx() ctx: Scenes.SceneContext,
    @Sender('id') tid: number
  ) {
    const user = await this.userService.getUser(tid);
    await ctx.reply(messageForm('How much do you want to withdraw'), {
      ...BackMenu,
      parse_mode: 'HTML',
    });
  }

  // @On('message')
  @UseGuards(RootGuard)
  @Hears(new RegExp(/^((?!< Back).)*$/))
  async onMessage(
    @Ctx() ctx: Scenes.SceneContext,
    @Message('text') amount: string,
    @Sender('id') tid: number
  ) {
    try {
      let transaction = Utils.createTransaction();
      const user = await this.userService.getUser(tid);
      transaction = await this.contractService.addWithdraw(
        user.myWallet,
        Utils.decimalSlice(amount),
        transaction
      );
      await this.contractService.withdraw(transaction);
      this.logger.log(`[${tid}]: complete to withdraw`);
      await this.depositService.addRootWithdrawList(
        tid,
        Utils.decimalSlice(amount)
      );
      await ctx.scene.enter('admin');
      await ctx.reply(messageForm(`Complete to apply withdraw ${amount}SOL`), {
        ...AdminMenu,
        parse_mode: 'HTML',
      });
    } catch (e) {
      this.logger.error(`[${tid}]: fail to withdraw`);
      await ctx.reply(messageForm(e.message), {
        ...BackMenu,
        parse_mode: 'HTML',
      });
    }
    // await this.onLeaveCommand(ctx);
  }

  @UseGuards(AdminGuard)
  @Hears('< Back')
  async onLeaveCommand(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.reply(messageForm('Withdraw cancelled.'), {
      ...WithdrawMenu,
      parse_mode: 'HTML',
    });
    await ctx.scene.enter('admin');
    // await ctx.scene.leave();
  }
}
