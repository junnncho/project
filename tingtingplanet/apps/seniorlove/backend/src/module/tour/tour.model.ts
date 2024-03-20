import { Document, Model, Query, Schema as Sch, Types } from "mongoose";
import { Id, dbConfig } from "@shared/util-server";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { TourInput, TourSchema } from "./tour.gql";
@Schema(dbConfig.defaultSchemaOptions)
class Tour extends TourSchema {}
export const name = Tour.name;
export type Input = TourInput;
export type Raw = Tour;
export interface DocType extends Document<Types.ObjectId, QryHelps, Raw>, DocMtds, Omit<Raw, "id"> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export interface Mdl extends Model<Doc>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  Tour
) as any;

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

// * 5. 1. Document Methods
interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  reserve: (userId: Id, gender: "male" | "female") => Doc;
  apply: (userId: Id, gender: "male" | "female") => Doc;
  unReserve: (userId: Id, gender: "male" | "female") => Doc;
}

schema.methods.unReserve = function (this: Doc, userId: Id, gender: "male" | "female") {
  if (this.status !== "active") throw new Error("Tour is not active");
  if (this.distinctGender) gender = "male";
  if (gender === "male") {
    if (this.maleReservers.some((id) => id.equals(userId))) {
      this.maleReservers = this.maleReservers.filter((id) => !id.equals(userId));
      this.totalMaleReserver = this.maleReservers.length;
      return this;
    } else if (this.maleApplicants.some((id) => id.equals(userId))) {
      this.maleApplicants = this.maleApplicants.filter((id) => !id.equals(userId));
      this.totalMaleApplicant = this.maleApplicants.length;
      return this;
    }
  } else if (gender === "female") {
    if (this.femaleReservers.some((id) => id.equals(userId))) {
      this.femaleReservers = this.femaleReservers.filter((id) => !id.equals(userId));
      this.totalFemaleReserver = this.femaleReservers.length;
      return this;
    } else if (this.femaleApplicants.some((id) => id.equals(userId))) {
      this.femaleApplicants = this.femaleApplicants.filter((id) => !id.equals(userId));
      this.totalFemaleApplicant = this.femaleApplicants.length;
      return this;
    }
  }
  throw new Error("not reserved or applied!");
};

schema.methods.reserve = function (this: Doc, userId: Id, gender: "male" | "female") {
  if (this.status !== "active") throw new Error("Tour is not active");
  if (this.distinctGender) gender = "male";
  if (gender === "male") {
    if (this.maleReservers.some((id) => id.equals(userId))) throw new Error("Already reserved");
    if (!this.maleApplicants.some((id) => id.equals(userId))) throw new Error("Not applied!");
    this.maleApplicants = this.maleApplicants.filter((id) => !id.equals(userId));
    this.totalMaleApplicant = this.maleApplicants.length;
    this.maleReservers.push(new Id(userId));
    this.totalMaleReserver = this.maleReservers.length;
    return this;
  } else if (gender === "female") {
    if (this.femaleReservers.some((id) => id.equals(userId))) throw new Error("Already reserved");
    if (!this.femaleApplicants.some((id) => id.equals(userId))) throw new Error("Not applied!");
    this.femaleApplicants = this.femaleApplicants.filter((id) => !id.equals(userId));
    this.totalFemaleApplicant = this.femaleApplicants.length;
    this.femaleReservers.push(new Id(userId));
    this.totalFemaleReserver = this.femaleReservers.length;
    return this;
  }
  throw new Error("InvalidGender!!");
};
schema.methods.apply = function (this: Doc, userId: Id, gender: "male" | "female") {
  if (this.status !== "active") throw new Error("Tour is not active");
  if (this.distinctGender) gender = "male";
  if (gender === "male") {
    if (this.maleApplicants.includes(userId)) throw new Error("Already applied");
    if (this.maleReservers.includes(userId)) throw new Error("Already reserved");
    this.maleApplicants.push(userId);
    this.totalMaleApplicant = this.maleApplicants.length;
    return this;
  } else if (gender === "female") {
    if (this.femaleApplicants.includes(userId)) throw new Error("Already applied");
    if (this.femaleReservers.includes(userId)) throw new Error("Already reserved");
    this.femaleApplicants.push(userId);
    this.totalFemaleApplicant = this.femaleApplicants.length;
    return this;
  }
  throw new Error("InvalidGender!!");
};
// * 5. 2. Model Statics
interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  dumb: () => Promise<Doc>;
}
schema.statics.dumb = async function () {
  const doc = this.pickOne({});
  return doc;
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
    if (this.isNew) model.addSummary(["total", this.status]);
    else if (this.status === "inactive" && this.isModified("status")) model.subSummary(["total", this.status]);
    // else model.moveSummary(this.getChanges().$set?.status, this.status);
    next();
  });
  return schema;
};
