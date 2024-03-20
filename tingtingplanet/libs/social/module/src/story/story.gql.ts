import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { StoryStat, StoryStatSchema } from "../_scalar/scalar.gql";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";

function getBoardId() {
  return this.board;
}

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String)
  @Prop({ type: String, required: true, default: "board", index: true })
  rootType: string;

  @Field(() => ID)
  @Prop({
    type: ObjectId,
    refPath: "rootType",
    default: getBoardId,
    required: true,
    index: true,
  })
  root: Id;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, immutable: true, index: true })
  parentType?: string;

  @Field(() => ID, { nullable: true })
  @Prop({
    type: ObjectId,
    refPath: "parentType",
    required: false,
    immutable: true,
    index: true,
  })
  parent?: Id;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, index: true })
  category?: string;

  @Field(() => String)
  @Prop({ type: String, enum: cnst.creatorTypes, required: true, index: true })
  type: cnst.CreatorType;

  @Field(() => shared.User, { nullable: true })
  @Prop({ type: ObjectId, ref: "user", required: false, index: true })
  user?: Id;

  @Field(() => String)
  @Prop({ type: String, required: true, default: "default", index: "text" })
  title: string;

  @Field(() => String)
  @Prop({ type: String, required: true, default: "default", index: "text" })
  content: string;

  @Field(() => [shared.File])
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  thumbnails: Id[];

  @Field(() => shared.File, { nullable: true })
  @Prop({ type: ObjectId, required: false, ref: "file" })
  logo?: Id;

  @Field(() => [String])
  @Prop([{ type: String, enum: cnst.storyPolicies, required: true, index: true }])
  policy: cnst.StoryPolicy[];

  @Field(() => [shared.File])
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  images: Id[];
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => ID, { nullable: true })
  user?: Id;
  @Field(() => [ID])
  thumbnails: Id[];
  @Field(() => ID, { nullable: true })
  logo?: Id;
  @Field(() => [ID])
  images: Id[];
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => Date)
  @Prop({ type: Date, required: true, default: () => new Date(), index: true })
  parentCreatedAt: Date;

  @Field(() => StoryStat)
  @Prop({
    type: StoryStatSchema,
    default: cnst.defaultStoryStat,
    required: true,
  })
  totalStat: StoryStat;

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.storyStatuses,
    required: true,
    default: "active",
  })
  status: cnst.StoryStatus;
}

// * 최종 생성 모델
@InputType()
export class StoryInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class Story extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class StorySchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class StorySummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  activeStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  approvedStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  deniedStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  haStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  daStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  waStory: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  maStory: number;
}
