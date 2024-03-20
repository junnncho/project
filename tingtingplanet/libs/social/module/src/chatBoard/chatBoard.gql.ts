import { BaseGql, Id, ObjectId } from "@shared/util-server";
import { ChatRoom } from "../chatRoom/chatRoom.gql";
import { Field, ID, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String)
  @Prop({ type: String, required: true, index: "text", default: "room" })
  name: string;

  @Field(() => ChatRoom)
  @Prop({ type: ObjectId, required: true, index: "text" })
  rootRoom: Id;

  @Field(() => ChatRoom)
  @Prop({ type: ObjectId, required: true, index: "text" })
  recentRoom: Id;
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  @Field(() => ID)
  rootRoom?: Id;

  @Field(() => ID)
  recentRoom?: Id;
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.chatBoardStatuses,
    required: true,
    default: "active",
  })
  status: cnst.ChatBoardStatus;
}

// * 최종 생성 모델
@InputType()
export class ChatBoardInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class ChatBoard extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class ChatBoardSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class ChatBoardSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalChatBoard: number;
}
