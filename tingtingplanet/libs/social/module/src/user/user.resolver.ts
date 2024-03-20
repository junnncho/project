import { Resolver } from "@nestjs/graphql";

import * as gql from "../gql";

@Resolver(() => gql.shared.User)
export class UserResolver {
  constructor() {
    // private readonly userService: UserService
    //
  }
}
