import { ActionLogInput, ActionLogSchema } from "./actionLog.gql";
import { Document, Model, Query, Schema as Sch, Types } from "mongoose";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { dbConfig } from "@shared/util-server";
@Schema(dbConfig.defaultSchemaOptions)
class ActionLog extends ActionLogSchema {}
export const name = ActionLog.name;
export type Input = ActionLogInput;
export type Raw = ActionLog;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, "id"> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  ActionLog
) as any;
schema.index({ target: 1, user: 1, action: 1 }, { unique: true });

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

// * 5. 1. Document Methods
interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  addValue: (value?: number) => Promise<number>;
  subValue: (value?: number) => Promise<number>;
  setValue: (value: number) => Promise<number>;
}
schema.methods.addValue = async function (this: Doc, value = 1) {
  const prev = this.value;
  this.value += value;
  await this.save();
  return prev;
};
schema.methods.subValue = async function (this: Doc, value = 1) {
  const prev = this.value;
  this.value -= value;
  await this.save();
  return prev;
};
schema.methods.setValue = async function (this: Doc, value: number) {
  const prev = this.value;
  await this.merge({ value }).save();
  return prev;
};

// * 5. 2. Model Statics
interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  browse: (data: Input) => Promise<Doc>;
}
schema.statics.browse = async function (this: Mdl, data: Input) {
  return (
    (await this.findOne({
      target: data.target,
      user: data.user,
      action: data.action,
    })) ?? new this(data)
  );
};

// * 5. 3. Model Statics
interface QryHelps extends dbConfig.DefaultQryHelps<Doc, QryHelps> {
  dumb: () => Query<any, Doc, QryHelps> & QryHelps;
}
schema.query.dumb = function () {
  return this.find({});
};
export const middleware = () => () => {
  /**
   * * 미들웨어 설계: 스키마 데이터 관리 시 사용할 미들웨어를 작성하세요.
   * ? save 시 자동으로 적용할 알고리즘을 적용하세요.
   */
  schema.pre<Doc>("save", async function (next) {
    const model = this.constructor as Mdl;
    if (this.isNew) model.addSummary(["total", "ha", "da", "wa", "ma"]);
    next();
  });
  return schema;
};
