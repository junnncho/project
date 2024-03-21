import * as SpecialReferral from './specialReferral.model';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Utils } from '@nogql/util';

@Injectable()
export class SpecialReferralService extends LoadService<SpecialReferral.Mdl, SpecialReferral.Doc> {
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
    let codes = [...new Set(Array.from({ length: 50 }, () => Utils.randomString(8)))];
    while (await this.SpecialReferral.exists({ code: { $in: codes } }))
      codes = [...new Set(Array.from({ length: 50 }, () => Utils.randomString(8)))];
    const referrals = await this.SpecialReferral.insertMany(codes.map((code) => ({ code, level })));
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
