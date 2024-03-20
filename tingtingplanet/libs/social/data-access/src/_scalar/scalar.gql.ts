import { Field, ID, InputType, Int, ObjectType, createFragment } from "@shared/util-client";
import { cnst } from "@shared/util";

import { Dayjs } from "dayjs";

@InputType("StoryStatInput")
export class StoryStatInput {}

@ObjectType("StoryStat")
export class StoryStat extends StoryStatInput {
  @Field(() => Int)
  views: number;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  unlikes: number;

  @Field(() => Int)
  comments: number;
}
export const storyStatFragment = createFragment(StoryStat);

export type CallConnection = {
  mediaStream: MediaStream | null;
  screenStream: MediaStream | null;
  mic: number;
  cam: boolean;
};

@InputType("ChatInput")
export class ChatInput {
  @Field(() => ID, { nullable: true })
  parent?: string;

  @Field(() => ID, { nullable: true })
  from?: string;

  @Field(() => String)
  type: cnst.ChatType;

  @Field(() => [ID])
  images: string[];

  @Field(() => ID, { nullable: true })
  emoji?: string;

  @Field(() => String)
  text: string;

  @Field(() => Date)
  at: Dayjs;
}
@ObjectType("Chat")
export class Chat extends ChatInput {}
export const chatFragment = createFragment(Chat);

@InputType("ChatContributionInput")
export class ChatContributionInput {}
@ObjectType("ChatContribution")
export class ChatContribution extends ChatContributionInput {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalSize: number;
}
export const chatContributionFragment = createFragment(ChatContribution);
