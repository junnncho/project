import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as DepositList from './depositList.model';
import * as WithdrawList from './withdrawList.model';
import { Doc as User } from '../user/user.model';
import { Id, LoadService } from '@shared/util-server';
import { ContractService } from '../contract/contract.service';
import { Utils } from '@shared/util';

export interface BankSummary {
  deposit: number;
  withdraw: number;
  exchange: number;
}

@Injectable()
export class DepositListService extends LoadService<
  DepositList.Mdl,
  DepositList.Doc
> {
  constructor(
    @InjectModel(DepositList.name)
    private readonly DepositList: DepositList.Mdl
  ) {
    super(DepositListService.name, DepositList);
  }
  // async getDepositList(tid: number): Promise<number[]> {
  //   const list = await this.DepositList.extractByTelegramId(tid);
  //   return list.map((item) => item.amount);
  // }
  async depositList2Xlsx() {
    const list = await this.DepositList.find({});
    return await Utils.doc2Xlsx(list, {
      telegramId: 'Telegram Id',
      createdAt: 'Written Time',
      amount: 'Amount(SOL)',
      status: 'Type',
    });
  }

  async todaySummary(): Promise<BankSummary> {
    const list = await this.DepositList.find({
      createdAt: { $gt: new Date(Date.now() - 246060 * 1000) },
    });
    let deposit = 0;
    let withdraw = 0;
    let exchange = 0;
    list.forEach((elem) => {
      if (elem.status === 'deposit' || elem.status === 'root-deposit')
        deposit += elem.amount;
      if (elem.status === 'withdraw' || elem.status === 'root-withdraw')
        withdraw += elem.amount;
      if (elem.status === 'exchange') exchange += elem.amount;
    });
    return { deposit, withdraw, exchange };
  }

  async getList(tid: number): Promise<DepositList.Doc[]> {
    return await this.DepositList.find({ telegramId: tid });
  }

  async addDepositList(user: User, amount: number): Promise<void> {
    if (user.role === 'root') {
      await this.DepositList.create({
        telegramId: user.telegramId,
        amount,
        status: 'root-deposit',
      });
    } else {
      await this.DepositList.create({
        telegramId: user.telegramId,
        amount,
      });
    }
  }

  async addExchangeList(tid: number, amount: number): Promise<void> {
    await this.DepositList.create({
      telegramId: tid,
      amount,
      status: 'exchange',
    });
  }

  async addRootWithdrawList(tid: number, amount: number): Promise<void> {
    await this.DepositList.create({
      telegramId: tid,
      amount: amount,
      status: 'root-withdraw',
    });
  }

  async addWithdrawLists(list: WithdrawList.Doc[]): Promise<void> {
    const newList = list.map((item) => ({
      telegramId: item.telegramId,
      amount: item.amount,
      createdAt: item.createdAt,
      status: 'withdraw',
    }));
    await this.DepositList.insertMany(newList);
  }
}

@Injectable()
export class WithdrawListService extends LoadService<
  WithdrawList.Mdl,
  WithdrawList.Doc
> {
  constructor(
    @InjectModel(WithdrawList.name)
    private readonly WithdrawList: WithdrawList.Mdl,
    private readonly contractService: ContractService,
    private readonly depositListService: DepositListService
  ) {
    super(WithdrawListService.name, WithdrawList);
  }
  async addwithdrawList(user: User, amount: number): Promise<void> {
    await this.WithdrawList.create({
      wallet: user.myWallet,
      telegramId: user.telegramId,
      amount,
    });
  }

  async cleanWithdrawList(): Promise<void> {
    const list = await this.WithdrawList.find({ status: 'complete' });
    // await this.depositListService.addWithdrawLists(list);
    await this.WithdrawList.deleteMany({ status: 'complete' });
  }

  async confirmWtihdrawList(): Promise<void> {
    const list = await this.WithdrawList.find({ status: 'pending' });
    for (const item of list) {
      await item.merge({ status: 'complete' }).save();
    }
    this.logger.debug(
      `confirm withdraw:'${list
        .map((item) =>
          JSON.stringify({
            amount: item.amount,
            wallet: item.wallet,
          })
        )
        .toString()}`
    );
    if (list.length === 0) return;
    const transaction = Utils.createTransaction();
    for (const item of list) {
      await this.contractService.addWithdraw(
        item.wallet,
        item.amount,
        transaction
      );
    }
    try {
      await this.contractService.withdraw(transaction);
    } catch (e) {
      throw new Error(`withdraw failed: ${e.message}`);
    }
    await this.depositListService.addWithdrawLists(list);
  }
}
