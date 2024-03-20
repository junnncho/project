import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Chat, ChatSchema } from "../_scalar/scalar.gql";
import { Emoji } from "../emoji/emoji.gql";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => shared.User)
  @Prop({ type: ObjectId, required: true, index: true, ref: "user" })
  user: Id;
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
  @Field(() => [Chat])
  @Prop([{ type: ChatSchema, required: true }])
  chats: Chat[];

  @Field(() => shared.Admin)
  @Prop({ type: ObjectId, required: false, index: true, ref: "admin" })
  admin?: Id;

  @Field(() => [shared.File])
  @Prop([{ type: ObjectId, required: true, ref: "file", index: true }])
  files: Id[];

  @Field(() => [Emoji])
  @Prop([{ type: ObjectId, required: true, ref: "emoji", index: true }])
  emojis: Id[];

  @Field(() => shared.JSON)
  @Prop({ type: Map, of: Date, default: {} })
  read: Map<string, Date>;

  @Field(() => shared.ServiceReview, { nullable: true })
  @Prop({ type: shared.ServiceReviewSchema, required: false })
  review?: shared.ServiceReview;

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.serviceDeskStatuses,
    required: true,
    default: "active",
  })
  status: cnst.ServiceDeskStatus;
}

// * 최종 생성 모델
@InputType()
export class ServiceDeskInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class ServiceDesk extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class ServiceDeskSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class ServiceDeskSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalServiceDesk: number;
}
