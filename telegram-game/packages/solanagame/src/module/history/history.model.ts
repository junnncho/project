import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types, Query, Schema as Sch } from 'mongoose';
import { dbConfig, Id, ObjectId } from '@shared/util-server';
import { cnst } from '@shared/util';

// * 2. 보안필드를 제외한 모든 필드

@Schema()
export class BlockStat {
  @Prop({ type: Number, required: false })
  blockNumber: number;

  @Prop({ type: String, required: false })
  blockHash: string;
}

const BlockStatSchema = SchemaFactory.createForClass(BlockStat);

@Schema()
class Base {
  @Prop({ type: ObjectId, required: true, ref: 'Game' })
  gameId: Id;

  @Prop({ type: Number, required: true, default: 0 })
  win: number;

  @Prop({ type: Number, required: true, default: 0 })
  lose: number;

  @Prop({ type: [String], enum: cnst.gameChoice, required: false })
  result: cnst.MixGameChoice;

  @Prop({ type: BlockStatSchema, required: false })
  startBlock: BlockStat;

  @Prop({ type: BlockStatSchema, required: false })
  closeBlock: BlockStat;

  @Prop({ type: BlockStatSchema, required: false })
  endBlock: BlockStat;
}

// * 3. 보안필드, default 필드 생성 필수

@Schema()
class Tail extends Base {
  //   @Prop({
  //     type: String,
  //     enum: cnst.bettingStatuses,
  //     required: true,
  //     default: 'pending',
  //   })
  //   status: cnst.HistoryStatus;
}

@Schema(dbConfig.defaultSchemaOptions)
class History extends Tail {}
export const name = History.name;
export type Raw = History;
export interface DocType
  extends Document<Types.ObjectId, QryHelps, Raw>,
    DocMtds,
    Omit<Raw, 'id'> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc, QryHelps, DocMtds>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> =
  SchemaFactory.createForClass<Raw, Doc>(History) as any;

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

// * 5. 1. Document Methods
interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  dumb: () => Doc;
}
schema.methods.dumb = function (this: Doc) {
  return this;
};

// * 5. 2. Model Statics
interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  writtenByCount: (nickname: string) => Promise<number>;
  extractExceptOne: () => Promise<Doc[]>;
  getLatestOriginId: () => Promise<number>;
}
schema.statics.writtenByCount = async function (nickname: string) {
  return this.countDocuments({ nickname });
};
schema.statics.getLatestOriginId = async function () {
  const lastId = await this.find({})
    .sort({ originId: 'desc' })
    .limit(1)
    .then((list) => list[0].originId);
  if (!lastId) new Error('any story in History DB');
  return lastId;
};

schema.statics.extractExceptOne = async function () {
  const list = await this.find({}).sort({ originId: 'asc' });
  list.pop();
  await this.deleteMany({
    originId: { $in: list.map((item) => item.originId) },
  });
  return list;
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
