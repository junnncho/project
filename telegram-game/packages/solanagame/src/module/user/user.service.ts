import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as User from './user.model';
import * as SpecialReferral from './specialReferral.model';
import { Utils } from '@shared/util';
import { Id, LoadService } from '@shared/util-server';
import { env } from '../../environments/env';
import { DepositListService } from '../waiting/waiting.service';

@Injectable()
export class SpecialReferralService extends LoadService<
  SpecialReferral.Mdl,
  SpecialReferral.Doc
> {
  constructor(
    @InjectModel(SpecialReferral.name)
    private readonly SpecialReferral: SpecialReferral.Mdl
  ) {
    super(SpecialReferralService.name, SpecialReferral);
  }
  async getSpecialReferral(code: string): Promise<SpecialReferral.Doc> {
    return await this.SpecialReferral.getReferralCode(code);
  }

  async generateReferral(level: number) {
    let codes = [
      ...new Set(Array.from({ length: 50 }, () => Utils.randomString(8))),
    ];
    while (await this.SpecialReferral.exists({ code: { $in: codes } }))
      codes = [
        ...new Set(Array.from({ length: 50 }, () => Utils.randomString(8))),
      ];
    const referrals = await this.SpecialReferral.insertMany(
      codes.map((code) => ({ code, level }))
    );
    return await Utils.doc2Xlsx(
      referrals.map((doc) => ({
        code: doc.code,
        level:
          level === 10
            ? 'highProfit'
            : level === 20
            ? 'zeroWithdrawFee'
            : level === 30
            ? 'Referral0.8%'
            : level === 40
            ? 'Referral1.2%'
            : level,
      })),
      {
        level: 'Type',
        code: 'Code',
      }
    );
  }

  async specialReferral2Xlsx() {
    const list = await this.SpecialReferral.find({});
    return await Utils.doc2Xlsx(
      list.map((doc) => ({
        code: doc.code,
        status: doc.status,
        level:
          doc.level === 10
            ? 'highProfit'
            : doc.level === 20
            ? 'zeroWithdrawFee'
            : doc.level === 30
            ? 'Referral0.8%'
            : doc.level === 40
            ? 'Referral1.2%'
            : doc.level,
      })),
      {
        level: 'Type',
        code: 'Code',
        status: 'Used',
      }
    );
  }
}

@Injectable()
export class UserService extends LoadService<User.Mdl, User.Doc> {
  constructor(
    @InjectModel(User.name)
    private readonly User: User.Mdl,
    private readonly specialReferralService: SpecialReferralService,
    private readonly depositListService: DepositListService
  ) {
    super(UserService.name, User);
  }
  async getAllUsers(): Promise<any> {
    //user list 가져오기
    return { message: 'Welcome to gamble-bot!' };
  }
  async getUser(tid: number): Promise<User.Doc> {
    const user = await this.User.findOne({ telegramId: tid });
    if (!user) throw new Error('You are not registered!');
    return user;
  }

  async getUserById(id: Id): Promise<User.Doc> {
    const user = await this.User.findById(id);
    if (!user) throw new Error('You are not registered!');
    return user;
  }
  async giveAdmin(tid: number): Promise<void> {
    const user = await this.getUser(tid);
    await user.giveAdmin().save();
  }

  async banUser(tid: number): Promise<void> {
    const user = await this.getUser(tid);
    await user.banUser().save();
  }
  async unbanUser(tid: number): Promise<void> {
    const user = await this.getUser(tid);
    await user.unbanUser().save();
  }

  async levelUp(tid: number): Promise<User.Doc> {
    const user = await this.getUser(tid);
    if (user.level >= env.referral.length) throw new Error('levelMaxError');
    if (user.point < env.referral[user.level].price)
      throw new Error('notEnoughSol');
    return await user
      .changePoint(-env.referral[user.level].price)
      .changeLevel(user.level + 1)
      .save();
  }

  async exchangeReferral(tid: number): Promise<number> {
    return await this.User.exchangeReferral(tid);
  }
  async signUpNormalReferral(
    tid: number,
    chatId: number,
    code: string
  ): Promise<User.Doc> {
    const ancestor = await this.User.findOne({ referralCode: code });
    if (!ancestor) throw new Error('anyReferral');
    let referralCode = Utils.randomString(8);
    while (await this.User.exists({ referralCode }))
      referralCode = Utils.randomString(8);
    const keypair = Utils.generateKeyPair();
    const newUser = await this.User.create({
      telegramId: tid,
      chatId,
      ancestor: ancestor._id,
      referralCode,
      gameWallet: keypair.publicKey,
      gameKey: keypair.privateKey,
    });
    await ancestor
      .merge({ children: [...ancestor.children, newUser._id] })
      .save();
    return newUser;
  }
  async registerSpecialReferral(tid: number, code: string): Promise<void> {
    const level = (await this.specialReferralService.getSpecialReferral(code))
      .level;
    const user = await this.getUser(tid);
    if (level < 10) {
      await user.merge({ level }).save();
    } else if (level === 10) {
      await user.changeSpecial('highProfit').save();
    } else if (level === 20) {
      await user.changeSpecial('zeroWithdrawFee').save();
    } else if (level === 30) {
      await user.changeSpecial('Referral0.8%').save();
    } else if (level === 40) {
      await user.changeSpecial('Referral1.2%').save();
    } else throw new Error('anyReferral');
  }

  async registerWallet(tid: number, wallet: string): Promise<void> {
    //지갑 체크한 후에 안 맞으면 에러
    await this.User.updateOne({ telegramId: tid }, { myWallet: wallet });
  }

  async registerAmount(tid: number, amount: number): Promise<void> {
    await this.User.updateOne({ telegramId: tid }, { bettingAmount: amount });
  }

  async userList2Xlsx() {
    const userList = await this.User.find();
    const newList = await Promise.all(
      userList.map(async (user) => {
        const userDeposit = await this.depositListService.getList(
          user.telegramId
        );
        const children = user.children
          ? await this.loadMany(user.children)
          : [];
        const ancestorTid = user.ancestor
          ? (await this.getUserById(user.ancestor)).telegramId
          : 'None';
        const string = children.map((item) => item.telegramId).join(',');
        let deposit = 0;
        let withdraw = 0;
        let exchange = 0;
        userDeposit.forEach((elem) => {
          if (elem.status === 'deposit') deposit += elem.amount;
          if (elem.status === 'withdraw') withdraw += elem.amount;
          if (elem.status === 'exchange') exchange += elem.amount;
        });
        return {
          ...user.toObject(),
          totalDeposit: deposit,
          totalWithdraw: withdraw,
          totalExchange: exchange,
          totalSum: deposit - withdraw,
          ancestor: ancestorTid,
          children: string,
        };
      })
    );
    return await Utils.doc2Xlsx(newList, {
      telegramId: 'Telegram Id',
      createdAt: 'Registration Time',
      myWallet: 'Own Wallet',
      gameWallet: 'Game Wallet',
      role: 'Role',
      level: 'Level',
      point: 'User Balance(SOL)',
      win: 'Win Count',
      lose: 'Lose Count',
      status: 'Status',
      totalDeposit: 'Total Deposit(SOL)',
      totalWithdraw: 'Total Withdraw(SOL)',
      totalSum: 'Total Sum(Deposit - Withdraw)',
      ancestor: 'Referral Ancestor',
      referralOut: 'Referral Out(SOL)',
      totalExchange: 'Exchange(SOL)',
      referralPoint: 'Current Referral Point(SOL)',
      referralIn: 'Referal Total In(SOL)',
      children: 'Referral Children',
    });
  }

  async referralList2Xlsx(tid: number) {
    const user = await this.getUser(tid);
    const referralList = await this.User.find({ ancestor: user._id });
    return await Utils.doc2Xlsx(referralList, {
      telegramId: 'Telegram Id',
      createdAt: 'Registration Time',
      level: 'Level',
      point: 'User Balance(SOL)',
      win: 'Win Count',
      lose: 'Lose Count',
      referralOut: 'Referral(SOL)',
    });
  }
}
