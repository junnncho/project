import * as gql from "../gql";
import * as srv from "../srv";
import { Allow, BaseResolver } from "@shared/util-server";
import { GroupCallService } from "./groupCall.service";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

@Resolver(() => gql.GroupCall)
export class GroupCallResolver extends BaseResolver(
  gql.GroupCall,
  gql.GroupCallInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(
    private readonly groupCallService: GroupCallService,
    private readonly fileService: srv.shared.FileService,
    private readonly userService: srv.UserService
  ) {
    super(groupCallService);
  }
  @ResolveField(() => [gql.shared.User])
  async users(@Parent() groupCall: gql.GroupCall) {
    if (!groupCall.users) return null;
    return await this.userService.loadMany(groupCall.users);
  }
}
