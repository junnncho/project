import * as Text from './text.model';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserService } from '../srv';
import { UpdateTextDto } from './text.controller';

@Injectable()
export class TextService extends LoadService<Text.Mdl, Text.Doc> {
  constructor(
    @InjectModel(Text.name)
    private readonly Text: Text.Mdl,
    private readonly userService: UserService
  ) {
    super(TextService.name, Text);
  }

  async getText(userId: Id, node: string): Promise<Text.Doc> {
    if (!node) throw new Error('emptyNode');
    const result = await this.Text.findOne({ user: userId, node });
    if (!result) throw new Error('noText');
    // return await this.Text.create({
    //   user: userId,
    //   node,
    //   blocks: [{ type: "header", data: { text: label || "New Text", level: 1 } }],
    // });
    return result;
  }

  async updateText(userId: Id, body: UpdateTextDto): Promise<void> {
    if (body.blocks.length === 0 || !body.blocks) throw new Error('emptyText');
    await this.Text.updateOne({ user: userId, node: body.node }, body, { upsert: true });
  }

  // async levelUp(tid: number): Promise<Text.Doc> {
  //   const user = await this.getText(tid);
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
  // ): Promise<Text.Doc> {
  //   const ancestor = await this.Text.findOne({ referralCode: code });
  //   if (!ancestor) throw new Error('anyReferral');
  //   let referralCode = Utils.randomString(8);
  //   while (await this.Text.exists({ referralCode }))
  //     referralCode = Utils.randomString(8);
  //   const keypair = Utils.generateKeyPair();
  //   const newText = await this.Text.create({
  //     telegramId: tid,
  //     chatId,
  //     ancestor: ancestor._id,
  //     referralCode,
  //     gameWallet: keypair.publicKey,
  //     gameKey: keypair.privateKey,
  //   });
  //   await ancestor
  //     .merge({ children: [...ancestor.children, newText._id] })
  //     .save();
  //   return newText;
  // }
  // async registerSpecialReferral(tid: number, code: string): Promise<void> {
  //   const level = (await this.specialReferralService.getSpecialReferral(code))
  //     .level;
  //   const user = await this.getText(tid);
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
  //   await this.Text.updateOne({ telegramId: tid }, { myWallet: wallet });
  // }

  // async registerAmount(tid: number, amount: number): Promise<void> {
  //   await this.Text.updateOne({ telegramId: tid }, { bettingAmount: amount });
  // }
}
