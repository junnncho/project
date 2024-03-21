import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types, Query, Schema as Sch } from 'mongoose';
import { dbConfig, Id, ObjectId } from '@shared/util-server';
import { cnst, Utils } from '@shared/util';
import { env } from '../../environments/env';

// * 2. 보안필드를 제외한 모든 필드
@Schema()
class Base {
  @Prop({ type: Number, required: true, index: true })
  telegramId: number;

  @Prop({ type: Number, required: true, index: true })
  chatId: number;

  @Prop({ type: String, required: true, index: true })
  referralCode: string;

  @Prop({ type: Number, required: true, default: 1 })
  level: number;

  @Prop({ type: Number, required: true, default: 1, index: false })
  bettingAmount: number;

  @Prop({ type: Number, required: true, default: 0, index: false })
  point: number;

  @Prop({ type: String, required: false })
  myWallet: string;

  @Prop({ type: String, required: false })
  gameWallet: string;

  @Prop({ type: String, required: false })
  gameKey: string;

  @Prop({ type: Number, required: true, default: 0 })
  win: number;

  @Prop({ type: Number, required: true, default: 0 })
  lose: number;

  @Prop({ type: ObjectId, ref: 'user', required: false, immutable: true })
  ancestor: Id;

  @Prop({ type: [ObjectId], ref: 'user', required: false, default: [] })
  children: Id[];

  @Prop({ type: Number, required: true, default: 0 })
  referralPoint: number;

  @Prop({ type: Number, required: true, default: 0 })
  referralIn: number;

  @Prop({ type: Number, required: true, default: 0 })
  referralOut: number;

  @Prop([{ type: String, enum: cnst.specials, required: true }])
  specials: cnst.Special[];

  @Prop({
    type: String,
    enum: cnst.language,
    required: true,
    default: 'english',
  })
  language: cnst.Language;

  @Prop({
    type: String,
    enum: cnst.userRoles,
    required: true,
    default: 'user',
  })
  role: cnst.UserRole;
}

// * 3. 보안필드, default 필드 생성 필수

@Schema()
class Tail extends Base {
  @Prop({
    type: String,
    enum: cnst.userStatuses,
    required: true,
    default: 'active',
  })
  status: cnst.UserStatus;
}

@Schema(dbConfig.defaultSchemaOptions)
class User extends Tail {}
export const name = User.name;
export type Raw = User;
export interface DocType
  extends Document<Types.ObjectId, QryHelps, Raw>,
    DocMtds,
    Omit<Raw, 'id'> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc, QryHelps, DocMtds>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> =
  SchemaFactory.createForClass<Raw, Doc>(User) as any;

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

export type PointType =
  | 'point'
  | 'referralIn'
  | 'referralOut'
  | 'referralPoint';

// * 5. 1. Document Methods
interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  changePoint: (point: number, kind?: PointType) => Doc;
  changeSpecial: (specials: cnst.Special) => Doc;
  changeLevel: (level: number) => Doc;
  winGame: () => Doc;
  loseGame: () => Doc;
  banUser: () => Doc;
  unbanUser: () => Doc;
  giveAdmin: () => Doc;
}
schema.methods.changePoint = function (
  this: Doc,
  point: number,
  kind: PointType = 'point'
) {
  switch (kind) {
    case 'point':
      if (this.point + point < 0) throw new Error('balance is not enough');
      return this.merge({ point: Utils.decimalSlice(this.point + point, 3) });
    case 'referralIn':
      if (this.referralIn + point < 0)
        throw new Error('referral in is not enough');
      return this.merge({
        referralIn: Utils.decimalSlice(this.referralIn + point, 3),
      });
    case 'referralPoint':
      if (this.referralPoint + point < 0)
        throw new Error('referral balance is not enough');
      return this.merge({
        referralPoint: Utils.decimalSlice(this.referralPoint + point, 3),
      });
    case 'referralOut':
      if (this.referralOut + point < 0)
        throw new Error('not enough referral out');
      return this.merge({
        referralOut: Utils.decimalSlice(this.referralOut + point, 3),
      });
    default:
      throw new Error('invalid point type');
  }
};

schema.methods.changeLevel = function (this: Doc, level: number) {
  return this.merge({ level });
};

schema.methods.changeSpecial = function (this: Doc, specials: cnst.Special) {
  return this.merge({
    specials: [...new Set([...this.specials, specials])],
  });
};
schema.methods.winGame = function (this: Doc) {
  return this.merge({ win: this.win + 1 });
};
schema.methods.loseGame = function (this: Doc) {
  return this.merge({ lose: this.lose + 1 });
};
schema.methods.banUser = function (this: Doc) {
  return this.merge({ status: 'restricted' });
};

schema.methods.unbanUser = function (this: Doc) {
  return this.merge({ status: 'active' });
};

schema.methods.giveAdmin = function (this: Doc) {
  return this.merge({ role: 'admin' });
};
// * 5. 2. Model Statics
interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  writtenByCount: (nickname: string) => Promise<number>;
  extractExceptOne: () => Promise<Doc[]>;
  getLatestOriginId: () => Promise<number>;
  exchangeReferral: (tid: number) => Promise<number>;
}

schema.statics.writtenByCount = async function (nickname: string) {
  return this.countDocuments({ nickname });
};
schema.statics.exchangeReferral = async function (tid: number) {
  const user = await this.findOne({ telegramId: tid });
  if (!user) throw new Error('user not found');
  const referralPoint = user.referralPoint;
  if (referralPoint < env.minimumExchange)
    throw new Error('not enough referral point');
  await user
    .merge({ referralPoint: 0, point: user.point + referralPoint })
    .save();
  return referralPoint;
};

// * 5. 3. Model Statics
interface QryHelps extends dbConfig.DefaultQryHelps<Doc, QryHelps> {
  dumb: () => Query<any, Doc, QryHelps> & QryHelps;
}
schema.query.dumb = function (this: Mdl) {
  return this.find({});
};
export const middleware = () => () => {
  /**
   * * 미들웨어 설계: 스키마 데이터 관리 시 사용할 미들웨어를 작성하세요.
   * ? save 시 자동으로 적용할 알고리즘을 적용하세요.
   */
  schema.pre<Doc>('save', async function (next) {
    next();
  });
  return schema;
};
