import {
  BaseGql,
  Field,
  ID,
  InputType,
  Int,
  JSON,
  ObjectType,
  PickType,
  createGraphQL,
  mutate,
} from "@shared/util-client";
import { Dayjs } from "dayjs";
import { StoryStat } from "../_scalar";
import { Utils, cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import graphql from "graphql-tag";

@InputType("CommentInput")
export class CommentInput {
  @Field(() => String)
  rootType: string;

  @Field(() => ID)
  root: string;

  @Field(() => String, { nullable: true })
  parentType: string | null;

  @Field(() => ID, { nullable: true })
  parent: string | null;

  @Field(() => String)
  type: cnst.CreatorType;

  @Field(() => shared.User)
  user: shared.User | shared.LightUser;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => String)
  content: string;

  @Field(() => JSON, { nullable: true })
  meta: any;

  @Field(() => [String])
  policy: cnst.StoryPolicy[];
}

@ObjectType("Comment", { _id: "id" })
export class Comment extends BaseGql(CommentInput) {
  @Field(() => Date)
  parentCreatedAt: Dayjs;

  @Field(() => String)
  status: cnst.CommentStatus;

  @Field(() => Int)
  like: number;

  @Field(() => StoryStat)
  totalStat: StoryStat;

  setLike() {
    if (this.like > 0) return false;
    this.totalStat.likes += this.like <= 0 ? 1 : 0;
    this.totalStat.unlikes -= this.like < 0 ? 1 : 0;
    this.like = 1;
    return true;
  }
  resetLike() {
    if (this.like) return false;
    this.totalStat.likes -= this.like;
    this.like = 0;
    return true;
  }
  unlike() {
    if (this.like < 0) return false;
    this.totalStat.likes -= this.like;
    this.totalStat.unlikes += this.like >= 0 ? 1 : 0;
    this.like = -1;
    return true;
  }
}

@ObjectType("LightComment", { _id: "id", gqlRef: "Comment" })
export class LightComment extends PickType(Comment, [
  "name",
  "user",
  "content",
  "parent",
  "parentCreatedAt",
  "like",
  "totalStat",
  "status",
] as const) {
  @Field(() => shared.LightUser)
  override user: shared.LightUser;
}

@ObjectType("CommentSummary")
export class CommentSummary {
  @Field(() => Int)
  totalComment: number;

  @Field(() => Int)
  activeComment: number;

  @Field(() => Int)
  approvedComment: number;

  @Field(() => Int)
  deniedComment: number;

  @Field(() => Int)
  haComment: number;

  @Field(() => Int)
  daComment: number;

  @Field(() => Int)
  waComment: number;

  @Field(() => Int)
  maComment: number;
}

export const commentQueryMap: { [key in keyof CommentSummary]: any } = {
  totalComment: { status: { $ne: "inactive" } },
  activeComment: { status: "active" },
  approvedComment: { status: "approved" },
  deniedComment: { status: "denied" },
  haComment: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastHour() },
  },
  daComment: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastDays() },
  },
  waComment: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastWeeks() },
  },
  maComment: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastMonths() },
  },
};

export const commentGraphQL = createGraphQL("comment" as const, Comment, CommentInput, LightComment);
export const {
  getComment,
  listComment,
  commentCount,
  commentExists,
  createComment,
  updateComment,
  removeComment,
  commentFragment,
  purifyComment,
  crystalizeComment,
  lightCrystalizeComment,
  defaultComment,
  mergeComment,
} = commentGraphQL;

export type LikeCommentMutation = { likeComment: number };
export const likeCommentMutation = graphql`
  mutation likeComment($commentId: ID!) {
    likeComment(commentId: $commentId)
  }
`;
export const likeComment = async (commentId: string) =>
  (await mutate<LikeCommentMutation>(likeCommentMutation, { commentId })).likeComment;

export type ResetLikeCommentMutation = { resetLikeComment: number };
export const resetLikeCommentMutation = graphql`
  mutation resetLikeComment($commentId: ID!) {
    resetLikeComment(commentId: $commentId)
  }
`;
export const resetLikeComment = async (commentId: string) =>
  (
    await mutate<ResetLikeCommentMutation>(resetLikeCommentMutation, {
      commentId,
    })
  ).resetLikeComment;

export type UnlikeCommentMutation = { unlikeComment: number };
export const unlikeCommentMutation = graphql`
  mutation unlikeComment($commentId: ID!) {
    unlikeComment(commentId: $commentId)
  }
`;
export const unlikeComment = async (commentId: string) =>
  (await mutate<UnlikeCommentMutation>(unlikeCommentMutation, { commentId })).unlikeComment;

export type ApproveCommentMutation = { approveComment: Comment };
export const approveCommentMutation = graphql`
  ${commentFragment}
  mutation approveComment($commentId: ID!) {
    approveComment(commentId: $commentId) {
      ...commentFragment
    }
  }
`;
export const approveComment = async (commentId: string) =>
  crystalizeComment(
    (
      await mutate<ApproveCommentMutation>(approveCommentMutation, {
        commentId,
      })
    ).approveComment
  );

export type DenyCommentMutation = { denyComment: Comment };
export const denyCommentMutation = graphql`
  ${commentFragment}
  mutation denyComment($commentId: ID!) {
    denyComment(commentId: $commentId) {
      ...commentFragment
    }
  }
`;
export const denyComment = async (commentId: string) =>
  crystalizeComment((await mutate<DenyCommentMutation>(denyCommentMutation, { commentId })).denyComment);
