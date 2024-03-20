import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { CallContribution, CallContributionSchema } from "../_scalar";
import { Field, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";

function getId() {
  return this._id.toString();
}

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.groupCallTypes,
    required: true,
    index: true,
  })
  type: cnst.GroupCallType;

  @Field(() => String)
  @Prop({ type: String, required: true, default: getId, index: true })
  roomId: string;
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => Date)
  @Prop({ type: Date, required: true, default: () => new Date() })
  startAt: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  endAt?: Date;

  @Field(() => [shared.User])
  @Prop([{ type: ObjectId, ref: "user", required: true, index: true }])
  users: Id[];

  @Field(() => shared.JSON)
  @Prop({ type: Map, of: CallContributionSchema, required: false })
  contribution?: Map<string, CallContribution>;

  @Field(() => CallContribution)
  @Prop({ type: CallContributionSchema, required: false })
  totalContribution?: CallContribution;

  @Field(() => shared.JSON)
  @Prop({ type: Map, of: shared.ServiceReviewSchema, required: false })
  review?: Map<string, shared.ServiceReview>;

  @Field(() => shared.ServiceReview)
  @Prop({ type: shared.ServiceReviewSchema, required: false })
  totalReview?: shared.ServiceReview;

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.groupCallStatuses,
    required: false,
    default: "active",
  })
  status: cnst.GroupCallStatus;
}

// * 최종 생성 모델
@InputType()
export class GroupCallInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class GroupCall extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class GroupCallSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class GroupCallSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalGroupCall: number;
}
