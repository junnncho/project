import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";
import { ChatBoard } from "libs/social/module/src/gql";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String)
  @Prop({ type: String, required: true, index: true })
  name: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: ObjectId, required: true })
  chatBoard?: Id;

  @Field(() => shared.User)
  @Prop({ type: ObjectId, required: true, index: true })
  driver: Id;

  @Field(() => Date)
  @Prop({ type: Date, required: true, index: true, default: new Date() })
  departAt: Date;

  @Field(() => String)
  @Prop({ type: String, required: true })
  phone: string;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0 })
  dues: number;

  @Field(() => [shared.File], { nullable: true })
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  thumbnails?: Id[];

  @Field(() => String)
  @Prop({ type: String, required: true, index: true })
  place: string;

  @Field(() => [[String, String]])
  @Prop({ type: [[String, String]], required: true })
  departPlace: [string, string][];

  @Field(() => String)
  @Prop({ type: String, required: true, default: "" })
  content: string;

  @Field(() => [shared.File])
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  contentFiles: Id[];

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  maxMaleReserver: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  maxFemaleReserver: number;

  @Field(() => Boolean)
  @Prop({ type: Boolean, required: true, default: true })
  distinctGender: boolean;
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => [ID])
  contentFiles: Id[];

  @Field(() => [ID])
  thumbnails: Id[];

  @Field(() => ID)
  driver: Id;

  @Field(() => ID)
  chatBoard: Id;
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => [shared.User])
  @Prop({ type: [ObjectId], required: true, default: [] as Id[] })
  femaleApplicants: Id[];

  @Field(() => [shared.User])
  @Prop({ type: [ObjectId], required: true, default: [] as Id[] })
  maleApplicants: Id[];

  @Field(() => [shared.User])
  @Prop({ type: [ObjectId], required: true, default: [] as Id[] })
  femaleReservers: Id[];

  @Field(() => [shared.User])
  @Prop({ type: [ObjectId], required: true, default: [] as Id[] })
  maleReservers: Id[];

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.tourStatuses,
    required: true,
    default: "active",
  })
  status: cnst.TourStatus;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalFemaleReserver: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalMaleReserver: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalFemaleApplicant: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalMaleApplicant: number;
}

// * 최종 생성 모델
@InputType()
export class TourInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class Tour extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class TourSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class TourSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalTour: number;
}
