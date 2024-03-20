import {
  BaseGql,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PickType,
  createGraphQL,
  mutate,
  query,
} from "@shared/util-client";
import { Utils, cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import dayjs, { Dayjs } from "dayjs";
import graphql from "graphql-tag";

@InputType("UserInput")
export class UserInput implements shared.UserInput {
  @Field(() => String)
  nickname: string;

  @Field(() => shared.File, { nullable: true })
  image: shared.File | null;

  @Field(() => [String], { default: ["user"] })
  requestRoles: cnst.UserRole[];

  @Field(() => Date, { default: dayjs().set("year", 1990) })
  dateOfBirth: Dayjs;

  @Field(() => String, { default: "male" })
  gender: cnst.Gender;

  @Field(() => String)
  phone: string;

  @Field(() => [String, String], { nullable: true, default: undefined })
  location?: [string, string];
}

@ObjectType("User", { _id: "id" })
export class User extends BaseGql(UserInput) implements shared.User {
  @Field(() => [String])
  roles: cnst.UserRole[];

  @Field(() => ID)
  keyring: string;

  @Field(() => Date)
  lastLoginAt: Dayjs;

  @Field(() => String)
  status: cnst.UserStatus;

  @Field(() => [ID])
  chatBoards: string[];

  @Field(() => String, { nullable: true })
  mobileToken?: string;
}

@ObjectType("LightUser", { _id: "id", gqlRef: "User" })
export class LightUser extends PickType(User, ["status", "gender", "dateOfBirth", "nickname", "image"] as const) {}

@ObjectType("UserSummary")
export class UserSummary {
  @Field(() => Int)
  totalUser: number;

  @Field(() => Int)
  restrictedUser: number;

  @Field(() => Int)
  businessUser: number;

  @Field(() => Int)
  hau: number;

  @Field(() => Int)
  dau: number;

  @Field(() => Int)
  wau: number;

  @Field(() => Int)
  mau: number;
}

export const userQueryMap: { [key in keyof UserSummary]: any } = {
  totalUser: { status: { $ne: "inactive" } },
  restrictedUser: { status: "restricted" },
  businessUser: { roles: "business" },
  hau: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastHour() },
  },
  dau: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastDays() },
  },
  wau: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastWeeks() },
  },
  mau: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastMonths() },
  },
};

export const userGraphQL = createGraphQL("user" as const, User, UserInput, LightUser);
export const {
  getUser,
  listUser,
  userCount,
  userExists,
  createUser,
  updateUser,
  removeUser,
  userFragment,
  lightUserFragment,
  purifyUser,
  crystalizeUser,
  lightCrystalizeUser,
  defaultUser,
  mergeUser,
} = userGraphQL;

export type WhoAmIQuery = { whoAmI: User };
export const whoAmIQuery = graphql`
  ${userFragment}
  query whoAmI {
    whoAmI {
      ...userFragment
    }
  }
`;
export const whoAmI = async () => crystalizeUser((await query<WhoAmIQuery>(whoAmIQuery)).whoAmI);

export type AddUserRoleMutation = { addUserRole: User };
export const addUserRoleMutation = graphql`
  ${userFragment}
  mutation addUserRole($userId: ID!, $role: String!) {
    addUserRole(userId: $userId, role: $role) {
      ...userFragment
    }
  }
`;
export const addUserRole = async (userId: string, role: cnst.UserRole) =>
  crystalizeUser((await mutate<AddUserRoleMutation>(addUserRoleMutation, { userId, role })).addUserRole);

export type AddMobileTokenMutation = { addMobileToken: boolean };
export const addMobileTokenMutation = graphql`
  mutation addMobileToken($token: String!) {
    addMobileToken(token: $token)
  }
`;
export const addMobileToken = async (token: string) =>
  (await mutate<AddMobileTokenMutation>(addMobileTokenMutation, { token })).addMobileToken;
