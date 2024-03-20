import { Document, Model, Query, Schema as Sch, Types } from "mongoose";
import { Id, dbConfig } from "@shared/util-server";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { StoryInput, StorySchema } from "./story.gql";
@Schema(dbConfig.defaultSchemaOptions)
class Story extends StorySchema {}
export const name = Story.name;
export type Input = StoryInput;
export type Raw = Story;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, "id"> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  Story
) as any;
schema.index({ title: "text", content: "text" });

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
  view: (storyId: Id) => Promise<boolean>;
  comment: (storyId: Id, value?: number) => Promise<boolean>;
  like: (storyId: Id, prev?: number) => Promise<boolean>;
  resetLike: (storyId: Id, prev: number) => Promise<boolean>;
  unlike: (storyId: Id, prev?: number) => Promise<boolean>;
}
schema.statics.view = async function (storyId: Id) {
  const { modifiedCount } = await this.updateOne({ _id: storyId }, { $inc: { "totalStat.views": 1 } });
  return !!modifiedCount;
};
schema.statics.comment = async function (storyId: Id, value = 1) {
  const { modifiedCount } = await this.updateOne({ _id: storyId }, { $inc: { "totalStat.comments": value } });
  return !!modifiedCount;
};
schema.statics.like = async function (storyId: Id, prev = 0) {
  const { modifiedCount } = await this.updateOne(
    { _id: storyId },
    {
      $inc: {
        "totalStat.likes": prev <= 0 ? 1 : 0,
        "totalStat.unlikes": prev < 0 ? -1 : 0,
      },
    }
  );
  return !!modifiedCount;
};
schema.statics.resetLike = async function (storyId: Id, prev: number) {
  const { modifiedCount } = await this.updateOne(
    { _id: storyId },
    {
      $inc: {
        "totalStat.likes": prev > 0 ? -1 : 0,
        "totalStat.unlikes": prev < 0 ? -1 : 0,
      },
    }
  );
  return !!modifiedCount;
};
schema.statics.unlike = async function (storyId: Id, prev = 0) {
  const { modifiedCount } = await this.updateOne(
    { _id: storyId },
    {
      $inc: {
        "totalStat.likes": prev > 0 ? -1 : 0,
        "totalStat.unlikes": prev >= 0 ? 1 : 0,
      },
    }
  );
  return !!modifiedCount;
};
// * 5. 3. Query Helper
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
    else if (this.status === "inactive" && this.isModified("status")) model.subSummary();
    // else model.moveSummary(this.getChanges().$set?.status, this.status);
    next();
  });
  return schema;
};
