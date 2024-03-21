import mongooseHidden from 'mongoose-hidden';
import { Document, Model, Query, Schema as Sch, Types } from 'mongoose';
import { Id, ObjectId } from '@nogql/util-server';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { cnst } from '@nogql/util';
import { dbConfig } from '@nogql/util-server';
// import { File } from "../file/file.model";

// * 1. 보안필드를 제외한 모든 필드
@Schema()
class Base {
  @Prop({ type: String, required: false, default: '' })
  nickname: string;

  @Prop({ type: ObjectId, required: false })
  image?: Id;

  @Prop([{ type: String, enum: cnst.userRoles, required: true, index: true }])
  requestRoles: cnst.UserRole[];
}

// * 3. 보안필드, default 필드 생성 필수
@Schema()
class Tail extends Base {
  @Prop({ type: ObjectId, ref: 'keyring', required: true })
  keyring: Id;

  @Prop({ type: String, enum: cnst.userRoles, default: 'user', required: true })
  role: cnst.UserRole;

  @Prop([{ type: String, enum: cnst.userRoles, default: 'user', required: true }])
  roles: cnst.UserRole[];

  @Prop([{ type: String, required: true, index: true }])
  playing: string[];

  @Prop({ type: Date, required: true, default: () => new Date(), index: true })
  lastLoginAt: Date;

  @Prop({
    type: String,
    enum: cnst.profileStatuses,
    required: true,
    default: 'prepare',
  })
  profileStatus: cnst.ProfileStatus;

  @Prop({ type: Date, required: false })
  restrictUntil?: Date;

  @Prop({ type: String, required: false })
  restrictReason?: string;

  @Prop({ type: String, required: false })
  mobileToken?: string;

  @Prop({
    type: String,
    enum: cnst.userStatuses,
    required: true,
    default: 'active',
  })
  status: cnst.UserStatus;
}

// * 4. 데이터 모니터링을 위한 Summary 모델
@Schema()
export class UserSummary {
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalUser: number;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  restrictedUser: number;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  businessUser: number;

  @Prop({ type: Number, required: true, min: 0 })
  hau: number;

  @Prop({ type: Number, required: true, min: 0 })
  dau: number;

  @Prop({ type: Number, required: true, min: 0 })
  wau: number;

  @Prop({ type: Number, required: true, min: 0 })
  mau: number;
}

@Schema(dbConfig.defaultSchemaOptions)
class User extends Tail {}
export const name = User.name;
export type Raw = User;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, 'id'> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  User
) as any;
/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */
// * 5. 1. Document Methods
export interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  addRole: (role: cnst.UserRole) => Doc;
  subRole: (role: cnst.UserRole) => Doc;
}
schema.methods.addRole = function (this: Doc, role: cnst.UserRole) {
  if (!this.roles.includes(role)) this.roles.push(role);
  return this;
};
schema.methods.subRole = function (this: Doc, role: cnst.UserRole) {
  this.roles = this.roles.filter((r) => r !== role);
  return this;
};

// * 5. 2. Model Statics
export interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  dumb: () => Promise<Doc>;
}
schema.statics.dumb = async function () {
  const doc = this.pickOne({});
  return doc;
};

// * 5. 3. Model Statics
export interface QryHelps extends dbConfig.DefaultQryHelps<Doc, QryHelps> {
  dumb: () => Query<any, Doc, QryHelps> & QryHelps;
}
schema.query.dumb = function () {
  return this.find({});
};

export const middleware = () => () => {
  // /**
  //  * * 미들웨어 설계: 스키마 데이터 관리 시 사용할 미들웨어를 작성하세요.
  //  * ? save 시 자동으로 적용할 알고리즘을 적용하세요.
  //  */
  schema.pre<Doc>('save', async function (next) {
    const model = this.constructor as Mdl;
    if (this.isNew) model.addSummary(['total', this.status]);
    else if (this.status === 'inactive' && this.isModified('status')) model.subSummary(['total', this.status]);
    next();
  });
  return schema;
};
