import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";
import * as gql from "../gql";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => gql.Quest)
  @Prop({ type: ObjectId, required: true, index: true })
  quest: Id;

  @Field(() => shared.User)
  @Prop({ type: ObjectId, required: true, index: true })
  user: Id;

  @Field(() => [shared.File], { nullable: true })
  @Prop([{ type: ObjectId, required: true, ref: "file" }])
  images?: Id[];
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => [ID])
  images: Id[];

  @Field(() => ID)
  quest: Id;

  @Field(() => ID)
  user: Id;
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.questVerifyStatuses,
    required: true,
    default: "pending",
  })
  status: cnst.QuestVerifyStatus;
}

// * 최종 생성 모델
@InputType()
export class QuestVerifyInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class QuestVerify extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class QuestVerifySchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class QuestVerifySummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalQuestVerify: number;
}
