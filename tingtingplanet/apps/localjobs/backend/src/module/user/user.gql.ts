import { Field, InputType, Int, IntersectionType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { cnst } from "@shared/util";
import { mixInputType, mixObjectType } from "@shared/util-server";
import { gql as shared } from "@shared/module";

function validateOptionInterests() {
  if (this.interests.length > 3 && this.interests.length < 5) return false;
  return true;
}

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {
  @Field(() => Date)
  @Prop({ type: Date, required: true, default: () => new Date() })
  dateOfBirth: Date;

  @Field(() => String)
  @Prop({ type: String, required: true, enum: cnst.genders, default: "male" })
  gender: cnst.Gender;

  @Field(() => String)
  @Prop({ type: String, required: true, default: "-" })
  phone: string;

  @Field(() => String)
  @Prop({ type: String, required: true, default: "abc@abc.com" })
  email: string;

  @Field(() => [String, String], { nullable: true })
  @Prop({ type: [String, String], required: true })
  location?: [string, string];

  @Field(() => String)
  @Prop({ type: String, required: false, default: "" })
  detailLocation: string;

  // @Field(() => String)
  // @Prop({ type: String, required: false, nullable: true })
  // mobileToken: string;
}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {
  // @Field(() => shared.CoordinateInput)
  // location: shared.Coordinate;
}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {
  @Field(() => Int)
  @Prop({ type: Number, required: true, default: 0, min: 0 })
  point: number;
}

export type JunnntingUserInput = Base;
export type JunnntingUser = Tail;

// * 최종 생성 모델
@InputType()
export class UserInput {}
export interface UserInput extends shared.UserInput, InputOverwrite, Base {}
mixInputType(shared.UserInput, IntersectionType(InputOverwrite, Base, InputType));

export class User {}
export interface User extends shared.User, Base, Tail {}
mixObjectType(shared.User, IntersectionType(Base, Tail)); // 앱이랑 소셜이랑 셰어드 섞어주는 코드

@Schema()
export class UserSchema extends Tail {}

// * 4. 데이터 모니터링을 위한 Summary 모델
@ObjectType({ isAbstract: true })
@Schema()
export class JunnntingUserSummary {}
export class UserSummary {}
export interface UserSummary extends shared.UserSummary, shared.UserSummary, JunnntingUserSummary {}
mixObjectType(shared.UserSummary, JunnntingUserSummary);
