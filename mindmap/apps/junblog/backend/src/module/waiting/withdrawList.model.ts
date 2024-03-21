import { Document, Model, Query, Schema as Sch, Types } from 'mongoose';
import { Id, ObjectId, dbConfig } from '@nogql/util-server';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { cnst } from '@nogql/util';

// * 2. 보안필드를 제외한 모든 필드
@Schema()
class Base {
  @Prop({ type: ObjectId, required: true })
  user: Id;

  @Prop({ type: String, required: true })
  wallet: string;

  @Prop({ type: Number, required: true, default: 0 })
  amount: number;
}

// * 3. 보안필드, default 필드 생성 필수

@Schema()
class Tail extends Base {
  @Prop({
    type: String,
    enum: cnst.withdrawStatuses,
    required: true,
    default: 'pending',
  })
  status: cnst.WithdrawStatus;
}

@Schema(dbConfig.defaultSchemaOptions)
class WithdrawList extends Tail {}
export const name = WithdrawList.name;
export type Raw = WithdrawList;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, 'id'> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc, QryHelps, DocMtds>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  WithdrawList
) as any;

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
  if (!lastId) new Error('any story in withdrawList DB');
  return lastId;
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
