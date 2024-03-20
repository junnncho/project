import { BaseGql, Field, ID, InputType, Int, ObjectType, PickType, createGraphQL, mutate } from "@shared/util-client";
import { StoryStat } from "../_scalar";
import { Utils, cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import dayjs from "dayjs";
import graphql from "graphql-tag";

@InputType("StoryInput")
export class StoryInput {
  @Field(() => String)
  rootType: string;

  @Field(() => ID)
  root: string;

  @Field(() => String, { nullable: true })
  parentType: string | null;

  @Field(() => ID, { nullable: true })
  parent: string | null;

  @Field(() => String, { nullable: true })
  category: string | null;

  @Field(() => String, { default: "user" })
  type: cnst.CreatorType;

  @Field(() => shared.User, { nullable: true })
  user: shared.User | null;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [shared.File])
  thumbnails: shared.File[];

  @Field(() => shared.File, { nullable: true })
  logo: shared.File | null;

  @Field(() => [String])
  policy: cnst.StoryPolicy[];

  @Field(() => [shared.File])
  images: shared.File[];
}

@ObjectType("Story", { _id: "id" })
export class Story extends BaseGql(StoryInput) {
  @Field(() => Date)
  parentCreatedAt: Date;

  @Field(() => StoryStat)
  totalStat: StoryStat;

  @Field(() => String)
  status: cnst.StoryStatus;

  @Field(() => Int)
  view: number;

  @Field(() => Int)
  like: number;

  isNew() {
    return this.createdAt.isAfter(dayjs().subtract(1, "day"));
  }
  isViewable(self?: shared.User) {
    return (
      !this.policy.includes("private") ||
      self?.roles.includes("admin") ||
      this.user?.id === self?.id ||
      this.user?.roles.includes("admin")
    );
  }
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
  isMe(self?: shared.User) {
    return this.user && this.user.id === self?.id;
  }
}

@ObjectType("LightStory", { _id: "id", gqlRef: "Story" })
export class LightStory extends PickType(Story, [
  "root",
  "rootType",
  "user",
  "category",
  "type",
  "user",
  "title",
  "images",
  "thumbnails",
  "logo",
  "policy",
  "totalStat",
] as const) {}

@ObjectType("StorySummary")
export class StorySummary {
  @Field(() => Int)
  totalStory: number;

  @Field(() => Int)
  activeStory: number;

  @Field(() => Int)
  approvedStory: number;

  @Field(() => Int)
  deniedStory: number;

  @Field(() => Int)
  haStory: number;

  @Field(() => Int)
  daStory: number;

  @Field(() => Int)
  waStory: number;

  @Field(() => Int)
  maStory: number;
}

export const storyQueryMap: { [key in keyof StorySummary]: any } = {
  totalStory: { status: { $ne: "inactive" } },
  activeStory: { status: "active" },
  approvedStory: { status: "approved" },
  deniedStory: { status: "denied" },
  haStory: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastHour() },
  },
  daStory: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastDays() },
  },
  waStory: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastWeeks() },
  },
  maStory: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastMonths() },
  },
};

export const storyGraphQL = createGraphQL("story" as const, Story, StoryInput, LightStory);
export const {
  getStory,
  listStory,
  storyCount,
  storyExists,
  createStory,
  updateStory,
  removeStory,
  storyFragment,
  lightStoryFragment,
  purifyStory,
  crystalizeStory,
  lightCrystalizeStory,
  defaultStory,
  addStoryFiles,
  mergeStory,
} = storyGraphQL;

export type LikeStoryMutation = { likeStory: number };
export const likeStoryMutation = graphql`
  mutation likeStory($storyId: ID!) {
    likeStory(storyId: $storyId)
  }
`;
export const likeStory = async (storyId: string) =>
  (await mutate<LikeStoryMutation>(likeStoryMutation, { storyId })).likeStory;

export type ResetLikeStoryMutation = { resetLikeStory: number };
export const resetLikeStoryMutation = graphql`
  mutation resetLikeStory($storyId: ID!) {
    resetLikeStory(storyId: $storyId)
  }
`;
export const resetLikeStory = async (storyId: string) =>
  (await mutate<ResetLikeStoryMutation>(resetLikeStoryMutation, { storyId })).resetLikeStory;

export type UnlikeStoryMutation = { unlikeStory: number };
export const unlikeStoryMutation = graphql`
  mutation unlikeStory($storyId: ID!) {
    unlikeStory(storyId: $storyId)
  }
`;
export const unlikeStory = async (storyId: string) =>
  (await mutate<UnlikeStoryMutation>(unlikeStoryMutation, { storyId })).unlikeStory;

export type ApproveStoryMutation = { approveStory: Story };
export const approveStoryMutation = graphql`
  ${storyFragment}
  mutation approveStory($storyId: ID!) {
    approveStory(storyId: $storyId) {
      ...storyFragment
    }
  }
`;
export const approveStory = async (storyId: string) =>
  crystalizeStory((await mutate<ApproveStoryMutation>(approveStoryMutation, { storyId })).approveStory);

export type DenyStoryMutation = { denyStory: Story };
export const denyStoryMutation = graphql`
  ${storyFragment}
  mutation denyStory($storyId: ID!) {
    denyStory(storyId: $storyId) {
      ...storyFragment
    }
  }
`;
export const denyStory = async (storyId: string) =>
  crystalizeStory((await mutate<DenyStoryMutation>(denyStoryMutation, { storyId })).denyStory);
