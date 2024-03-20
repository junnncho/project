import { BaseGql, Field, ID, InputType, ObjectType, PickType } from "@shared/util-client";
import { File } from "../file/file.gql";
import { cnst } from "@shared/util";

@InputType("UserInput")
export class UserInput {
  @Field(() => String)
  nickname: string;

  @Field(() => File, { nullable: true })
  image: File | null;

  @Field(() => [String])
  requestRoles: cnst.UserRole[];
}

@ObjectType("User", { _id: "id" })
export class User extends BaseGql(UserInput) {
  @Field(() => [String])
  roles: cnst.UserRole[];

  @Field(() => ID)
  keyring: string;

  @Field(() => String)
  status: cnst.UserStatus;

  @Field(() => String, { nullable: true })
  mobileToken?: string;
}

@ObjectType("LightUser", { _id: "id", gqlRef: "User" })
export class LightUser extends PickType(User, ["nickname", "image"] as const) {}
