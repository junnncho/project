import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Schema as MongooseSchema } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
import { StoryStat, StoryStatSchema } from "../_scalar/scalar.gql";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: true, immutable: true, index: true })
  rootType: string;

  @Field(() => ID)
  @Prop({
    type: ObjectId,
    refPath: "rootType",
    required: true,
    immutable: true,
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

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.creatorTypes,
    required: true,
    immutable: true,
    index: true,
  })
  type: cnst.CreatorType;

  @Field(() => shared.User)
  @Prop({
    type: ObjectId,
    ref: "user",
    required: true,
    immutable: true,
    index: true,
  })
  user: Id;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, index: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, index: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, required: false, index: true })
  email?: string;

  @Field(() => String)
  @Prop({ type: String, required: true, default: "default", index: true })
  content: string;

  @Field(() => shared.JSON, { nullable: true })
  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  meta?: any;

  @Field(() => [String])
  @Prop([{ type: String, enum: cnst.storyPolicies, required: true, index: true }])
  policy: cnst.StoryPolicy[];
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => ID)
  user: Id;
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
    enum: cnst.commentStatuses,
    required: true,
    default: "active",
  })
  status: cnst.CommentStatus;
}

// * 최종 생성 모델
@InputType()
export class CommentInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class Comment extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class CommentSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class CommentSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  activeComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  approvedComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  deniedComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  haComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  daComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  waComment: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  maComment: number;
}
