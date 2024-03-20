import { BaseGql, Field, InputType, Int, ObjectType, PickType, createGraphQL, mutate, ID } from "@shared/util-client";
import { LightUser, User } from "../user/user.gql";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import { gql as social } from "@social/data-access";
import dayjs, { Dayjs } from "dayjs";
import graphql from "graphql-tag";
import { ChatBoard, LightChatBoard } from "libs/social/data-access/src/gql";

@InputType("QuestInput")
export class QuestInput {
  @Field(() => String)
  name: string;

  @Field(() => Date, { default: dayjs().set("hour", 7) })
  due: Dayjs;

  @Field(() => Int)
  point: number;

  @Field(() => [shared.File], { nullable: true })
  thumbnails: shared.File[] | null;

  @Field(() => String)
  content: string;

  @Field(() => [shared.File])
  contentFiles: shared.File[];
}

@ObjectType("Quest", { _id: "id" })
export class Quest extends BaseGql(QuestInput) {
  @Field(() => String)
  status: cnst.QuestStatus;
}

@ObjectType("LightQuest", { _id: "id", gqlRef: "Quest" })
export class LightQuest extends PickType(Quest, [
  "status",
  "name",
  "departAt",
  "dues",
  "chatBoard",
  "place",
  "departPlace",
  "maxFemaleReserver",
  "maxMaleReserver",
  "totalFemaleReserver",
  "phone",
  "totalMaleReserver",
  "chatBoard",
  "thumbnails",
] as const) {}

@ObjectType("QuestSummary")
export class QuestSummary {
  @Field(() => Int)
  totalQuest: number;
}

export const questQueryMap: { [key in keyof QuestSummary]: any } = {
  totalQuest: { status: { $ne: "inactive" } },
};

export const questGraphQL = createGraphQL("quest" as const, Quest, QuestInput, LightQuest);
export const {
  getQuest,
  listQuest,
  questCount,
  questExists,
  createQuest,
  updateQuest,
  removeQuest,
  lightQuestFragment,
  questFragment,
  purifyQuest,
  crystalizeQuest,
  lightCrystalizeQuest,
  defaultQuest,
  addQuestFiles,
} = questGraphQL;
// * Apply Quest Mutation
// export type ApplyQuestMutation = { applyQuest: Quest };
// export const applyQuestMutation = graphql`
//   ${questFragment}
//   mutation applyQuest($questId: ID!) {
//     applyQuest(questId: $questId) {
//       ...questFragment
//     }
//   }
// `;
// export const applyQuest = async (questId: string) =>
//   crystalizeQuest((await mutate<ApplyQuestMutation>(applyQuestMutation, { questId })).applyQuest);

// export type ReserveQuestMutation = { reserveQuest: Quest };
// export const reserveQuestMutation = graphql`
//   ${questFragment}
//   mutation reserveQuest($questId: ID!, $userId: ID!) {
//     reserveQuest(questId: $questId, userId: $userId) {
//       ...questFragment
//     }
//   }
// `;
// export const reserveQuest = async (questId: string, userId: string) =>
//   crystalizeQuest((await mutate<ReserveQuestMutation>(reserveQuestMutation, { questId, userId })).reserveQuest);

// export type UnReserveQuestMutation = { unReserveQuest: Quest };
// export const unReserveQuestMutation = graphql`
//   ${questFragment}
//   mutation unReserveQuest($questId: ID!, $userId: ID!) {
//     unReserveQuest(questId: $questId, userId: $userId) {
//       ...questFragment
//     }
//   }
// `;
// export const unReserveQuest = async (questId: string, userId: string) =>
//   crystalizeQuest((await mutate<UnReserveQuestMutation>(unReserveQuestMutation, { questId, userId })).unReserveQuest);
