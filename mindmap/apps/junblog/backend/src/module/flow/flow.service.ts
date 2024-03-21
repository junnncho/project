import * as Flow from './flow.model';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserService } from '../srv';
import { initialValue } from './flow.initiate';

@Injectable()
export class FlowService extends LoadService<Flow.Mdl, Flow.Doc> {
  constructor(
    @InjectModel(Flow.name)
    private readonly Flow: Flow.Mdl,
    private readonly userService: UserService
  ) {
    super(FlowService.name, Flow);
  }

  async getFlow(userId: Id): Promise<Flow.Doc | null> {
    const result = await this.Flow.findOne({ user: userId });
    if (!result) {
      console.log('noFlow');
      await this.Flow.create({ user: userId, nodes: initialValue.nodes, edges: initialValue.edges });
    }
    return result;
  }

  async updateFlow(userId: Id, nodes: any[], edges: any[]): Promise<void> {
    if (nodes.length === 0 || !nodes) throw new Error('emptyNodes');
    await this.Flow.updateOne({ user: userId }, { nodes, edges }, { upsert: true });
  }

  // async levelUp(tid: number): Promise<Node.Doc> {
  //   const user = await this.getNode(tid);
  //   if (user.level >= env.referral.length) throw new Error('levelMaxError');
  //   if (user.point < env.referral[user.level].price)
  //     throw new Error('notEnoughSol');
  //   return await user
  //     .changePoint(-env.referral[user.level].price)
  //     .changeLevel(user.level + 1)
  //     .save();
  // }

  // async signUpNormalReferral(
  //   tid: number,
  //   chatId: number,
  //   code: string
  // ): Promise<Node.Doc> {
  //   const ancestor = await this.Node.findOne({ referralCode: code });
  //   if (!ancestor) throw new Error('anyReferral');
  //   let referralCode = Utils.randomString(8);
  //   while (await this.Node.exists({ referralCode }))
  //     referralCode = Utils.randomString(8);
  //   const keypair = Utils.generateKeyPair();
  //   const newNode = await this.Node.create({
  //     telegramId: tid,
  //     chatId,
  //     ancestor: ancestor._id,
  //     referralCode,
  //     gameWallet: keypair.publicKey,
  //     gameKey: keypair.privateKey,
  //   });
  //   await ancestor
  //     .merge({ children: [...ancestor.children, newNode._id] })
  //     .save();
  //   return newNode;
  // }
  // async registerSpecialReferral(tid: number, code: string): Promise<void> {
  //   const level = (await this.specialReferralService.getSpecialReferral(code))
  //     .level;
  //   const user = await this.getNode(tid);
  //   if (level < 10) {
  //     await user.merge({ level }).save();
  //   } else if (level === 10) {
  //     await user.changeSpecial('highProfit').save();
  //   } else if (level === 20) {
  //     await user.changeSpecial('zeroWithdrawFee').save();
  //   } else if (level === 30) {
  //     await user.changeSpecial('Referral0.8%').save();
  //   } else if (level === 40) {
  //     await user.changeSpecial('Referral1.2%').save();
  //   } else throw new Error('anyReferral');
  // }

  // async registerWallet(tid: number, wallet: string): Promise<void> {
  //   //지갑 체크한 후에 안 맞으면 에러
  //   await this.Node.updateOne({ telegramId: tid }, { myWallet: wallet });
  // }

  // async registerAmount(tid: number, amount: number): Promise<void> {
  //   await this.Node.updateOne({ telegramId: tid }, { bettingAmount: amount });
  // }
}
