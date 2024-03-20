import { InputType, ObjectType, PickType, createGraphQL, query } from "@shared/util-client";
import { gql as shared } from "@shared/data-access";
import graphql from "graphql-tag";

@InputType("UserInput")
export class UserInput extends shared.User {}

@ObjectType("User", { _id: "id" })
export class User extends UserInput {}

@ObjectType("LightUser", { _id: "id", gqlRef: "User" })
export class LightUser extends PickType(User, ["nickname", "image", "status"] as const) {}

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

// * WhoAmI Query
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
