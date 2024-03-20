import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String) // user, story, comment, etc
  @Prop({ type: String, required: true, index: true })
  type: string;

  @Field(() => ID)
  @Prop({ type: ObjectId, refPath: "type", required: true, index: true })
  target: Id;

  @Field(() => ID)
  @Prop({ type: ObjectId, ref: "user", required: true, index: true })
  user: Id;

  @Field(() => String)
  @Prop({ type: String, required: true, index: true })
  action: string; // like, comment, follow, unfollow, block, unblock, report, unreport, etc
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => Int)
  @Prop({ type: Number, required: true, default: 0 })
  value: number;

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.actionLogStatuses,
    required: true,
    default: "active",
  })
  status: cnst.ActionLogStatus;
}

// * 최종 생성 모델
@InputType()
export class ActionLogInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class ActionLog extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class ActionLogSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class ActionLogSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalActionLog: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  haActionLog: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  daActionLog: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  waActionLog: number;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  maActionLog: number;
}
