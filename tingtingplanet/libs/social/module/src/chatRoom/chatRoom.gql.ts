import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { Chat, ChatContribution, ChatContributionSchema, ChatSchema } from "../_scalar/scalar.gql";
import { Emoji } from "../emoji/emoji.gql";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/module";

const getId = function (this: { _id: Id }) {
  return this._id;
};

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => ID, { nullable: true })
  @Prop({ type: ObjectId, index: true, required: false })
  prevChat?: Id;
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => ID, { nullable: true })
  prevChat?: Id;
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => ID)
  @Prop({ type: ObjectId, index: true, required: true, default: getId })
  root: Id;

  @Field(() => Date)
  @Prop({ type: Date, index: true, required: true, default: () => new Date() })
  rootCreatedAt: Date;

  @Field(() => [Chat])
  @Prop([{ type: ChatSchema, required: true, default: [] }])
  chats: Chat[];

  @Field(() => ID, { nullable: true })
  @Prop({ type: ObjectId, index: true, required: false })
  nextChat?: Id;

  @Field(() => ChatContribution)
  @Prop({
    type: ChatContributionSchema,
    required: true,
    default: { count: 0, size: 0, totalCount: 0, totalSize: 0 },
  })
  totalContribution: ChatContribution;

  @Field(() => shared.JSON)
  @Prop({
    type: Map,
    of: ChatContributionSchema,
    required: true,
    default: () => new Map<string, ChatContribution>(),
  })
  contribution: Map<string, ChatContribution>;

  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  roomNum: number;

  @Field(() => [shared.User])
  @Prop([{ type: ObjectId, required: true, ref: "user", index: true }])
  users: Id[];

  @Field(() => [shared.File])
  @Prop([{ type: ObjectId, required: true, ref: "file", index: true }])
  files: Id[];

  @Field(() => [Emoji])
  @Prop([{ type: ObjectId, required: true, ref: "emoji", index: true }])
  emojis: Id[];

  @Field(() => shared.JSON)
  @Prop({ type: Map, of: Date, default: () => new Map<string, Date>() })
  read: Map<string, Date>;

  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  unread: number;

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.chatRoomStatuses,
    required: true,
    default: "active",
  })
  status: cnst.ChatRoomStatus;
}

// * 최종 생성 모델
@InputType()
export class ChatRoomInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class ChatRoom extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class ChatRoomSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class ChatRoomSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalChatRoom: number;
}
