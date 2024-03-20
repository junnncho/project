import * as gql from "../gql";
import * as srv from "../srv";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { Account, Allow, Id, RequiredAuth } from "@shared/util-server";

@Resolver(() => gql.shared.User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly fileService: srv.shared.FileService) {}
}
