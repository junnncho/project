import { Injectable } from '@nestjs/common';
import { cnst } from '@shared/util';
import { env } from '../../environments/env';
import { ContractService } from '../contract/contract.service';
import { UserService } from '../user/user.service';
import {
  DepositListService,
  WithdrawListService,
} from '../waiting/waiting.service';

@Injectable()
export class RealTimeService {
  constructor(
    private readonly userService: UserService,
    private readonly depositService: DepositListService,
    private readonly withdrawService: WithdrawListService,
    private readonly contractService: ContractService
  ) {}

  //완료
  async withdrawApply(tid: number, amount: number): Promise<void> {
    const user = await this.userService.getUser(tid);
    if (user.status === 'restricted') throw new Error('restricted');
    const amountWithFee = amount + env.withdrawFee;
    if (amount < env.minimumWithdraw) throw new Error('underMinimumSol');
    if (user.point < amountWithFee) throw new Error('notEnoughSol');
    if (!user.myWallet) throw new Error('notRegisteredAddress');
    try {
      await this.withdrawService.addwithdrawList(user, amount);
    } catch {
      throw new Error('wrong');
    }
    await user.changePoint(-amountWithFee).save();
  }

  async depositCheck(tid: number): Promise<number> {
    const user = await this.userService.getUser(tid);
    const amount = await this.contractService.deposit(user.gameKey);
    if (amount > 0) {
      if (user.role !== 'root') await user.changePoint(amount).save();
      await this.depositService.addDepositList(user, amount);
    }
    return amount;
  }
}
