import * as db from "../db";
import * as gql from "../gql";
import { Account, Allow, Auth, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { ActionLogService } from "../actionLog/actionLog.service";
import { Args, ID, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Resolver(() => gql.Comment)
export class CommentResolver extends BaseResolver(
  gql.Comment,
  gql.CommentInput,
  Allow.Public,
  Allow.Public,
  Allow.Public
) {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly actionLogService: ActionLogService
  ) {
    super(commentService);
  }

  @Mutation(() => gql.Comment)
  @UseGuards(Allow.Admin)
  async approveComment(@Args({ name: "commentId", type: () => ID }) commentId: string) {
    return await this.commentService.approve(new Id(commentId));
  }

  @Mutation(() => gql.Comment)
  @UseGuards(Allow.Admin)
  async denyComment(@Args({ name: "commentId", type: () => ID }) commentId: string) {
    return await this.commentService.deny(new Id(commentId));
  }
  @Mutation(() => Boolean)
  @UseGuards(Allow.User)
  async likeComment(@Args({ name: "commentId", type: () => ID }) commentId: string, @RequiredAuth() account: Account) {
    return await this.commentService.like(new Id(commentId), account._id);
  }
  @Mutation(() => Boolean)
  @UseGuards(Allow.User)
  async resetLikeComment(
    @Args({ name: "commentId", type: () => ID }) commentId: string,
    @RequiredAuth() account: Account
  ) {
    return await this.commentService.resetLike(new Id(commentId), account._id);
  }
  @Mutation(() => Boolean)
  @UseGuards(Allow.User)
  async unlikeComment(
    @Args({ name: "commentId", type: () => ID }) commentId: string,
    @RequiredAuth() account: Account
  ) {
    return await this.commentService.unlike(new Id(commentId), account._id);
  }
  @ResolveField(() => gql.shared.User)
  async user(@Parent() comment: db.Comment.Doc) {
    return await this.userService.load(comment.user);
  }
  @ResolveField(() => Int)
  async like(@Parent() comment: db.Comment.Doc, @Auth() account?: Account) {
    const num =
      account?.role === "user"
        ? (
            await this.actionLogService.queryLoad({
              action: "like",
              target: comment._id,
              user: account._id,
            })
          )?.value ?? 0
        : 0;
    return num;
  }
}
