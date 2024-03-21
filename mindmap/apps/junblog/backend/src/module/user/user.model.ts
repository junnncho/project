import { Document, Model, Query, Schema as Sch, Types } from 'mongoose';
import { Id, ObjectId, dbConfig, validate } from '@nogql/util-server';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Utils, cnst } from '@nogql/util';
import { model as nogql } from '@nogql/module';
import mongooseHidden from 'mongoose-hidden';
import { initialValue } from '../flow/flow.initiate';

@Schema()
export class Theme {
  @Prop({ type: String, required: true, default: '#ffffff' })
  mainNode: string;

  @Prop({ type: String, required: true, default: '#000000' })
  edge: string;

  @Prop({ type: String, required: true, default: '#f6f6f6' })
  flowBg: string;

  @Prop({ type: String, required: true, default: '#f6f6f6' })
  contentBg: string;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);

// * 2. 보안필드를 제외한 모든 필드
@Schema()
class Base {
  @Prop({
    type: String,
    required: false,
    validate: validate.email,
    index: true,
  })
  email?: string;

  @Prop({
    type: ThemeSchema,
    required: true,
    default: initialValue.color,
  })
  color: Theme;

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
    hide: true,
  })
  status: cnst.UserStatus;

  @Prop({ type: Date, required: true, default: () => new Date(), index: true, hide: true })
  lastPostWorkAt: Date;
}

@Schema(dbConfig.defaultSchemaOptions)
class User extends Tail {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface User extends nogql.User.Raw {}
export const name = User.name;
export type Raw = User & nogql.User.Raw;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, 'id'> {}
export type Doc = DocType & nogql.User.DocType & dbConfig.DefaultSchemaFields;
export type Mdl = Model<Doc, QryHelps, DocMtds> & MdlStats & nogql.User.Mdl;
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = nogql.User.schema
  .add(SchemaFactory.createForClass<Raw, Doc>(User))
  .plugin(mongooseHidden()) as any;

// schema.methods.toJSON = function () {
//   const obj = this.toObject();
//   const tail = new Tail();
//   console.log("!!!", obj.);
// console.log("STAETRTTT", Object.keys(tail));
// for (const prop in Object.keys(tail)) {
//   console.log("!!!!", prop);
//   if (Object.prototype.hasOwnProperty.call(this, prop)) {
//     delete obj[prop];
//   }
// }
//   delete obj["myVideos"];
//   delete obj["viewVideos"];
//   delete obj["errorVideos"];

//   return obj;
// };

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

// * 5. 1. Document Methods
export type PointType = 'point' | 'referralIn' | 'referralOut' | 'referralPoint';

interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  banUser: () => Doc;
  unbanUser: () => Doc;
  giveAdmin: () => Doc;
}

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
}

schema.statics.writtenByCount = async function (nickname: string) {
  return this.countDocuments({ nickname });
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
