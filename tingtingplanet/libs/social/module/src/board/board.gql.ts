import { BaseGql } from "@shared/util-server";
import { Field, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => String)
  @Prop({ type: String, required: true, index: "text" })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: "text" })
  description: string;

  @Field(() => [String])
  @Prop([{ type: String, required: true, index: "text" }])
  categories: string[];

  @Field(() => [String])
  @Prop([{ type: String, enum: cnst.boardPolicies, required: true, index: true }])
  policy: cnst.BoardPolicy[];

  @Field(() => [String])
  @Prop([{ type: String, enum: cnst.userRoles, required: true, index: true }])
  roles: cnst.UserRole[];

  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.boardViewStyles,
    required: true,
    index: true,
  })
  viewStyle: cnst.BoardViewStyle;
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => String)
  @Prop({
    type: String,
    enum: cnst.boardStatuses,
    required: true,
    default: "active",
  })
  status: cnst.BoardStatus;
}

// * 최종 생성 모델
@InputType()
export class BoardInput extends IntersectionType(InputOverwrite, Base, InputType) {}
@ObjectType()
export class Board extends IntersectionType(BaseGql(Base), Tail) {}
@Schema()
export class BoardSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class BoardSummary {
  @Field(() => Int)
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalBoard: number;
}
