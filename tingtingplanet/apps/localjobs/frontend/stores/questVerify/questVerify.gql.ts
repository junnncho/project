import { BaseGql, Field, InputType, Int, ObjectType, PickType, createGraphQL, mutate, ID } from "@shared/util-client";
import { LightUser, User } from "../user/user.gql";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import { gql as social } from "@social/data-access";
import dayjs, { Dayjs } from "dayjs";
import graphql from "graphql-tag";
import { ChatBoard, LightChatBoard } from "libs/social/data-access/src/gql";
import { LightQuest, Quest } from "../quest/quest.gql";

@InputType("QuestVerifyInput")
export class QuestVerifyInput {
  @Field(() => Quest)
  quest: Quest | LightQuest;

  @Field(() => User)
  user: User | LightUser;

  @Field(() => [shared.File], { nullable: true })
  images: shared.File[] | null;
}

@ObjectType("QuestVerify", { _id: "id" })
export class QuestVerify extends BaseGql(QuestVerifyInput) {
  @Field(() => String)
  status: cnst.QuestVerifyStatus;
}

@ObjectType("LightQuestVerify", { _id: "id", gqlRef: "QuestVerify" })
export class LightQuestVerify extends PickType(QuestVerify, ["status", "user", "images"] as const) {}

@ObjectType("QuestVerifySummary")
export class QuestVerifySummary {
  @Field(() => Int)
  totalQuestVerify: number;
}

export const questVerifyQueryMap: { [key in keyof QuestVerifySummary]: any } = {
  totalQuestVerify: { status: { $ne: "inactive" } },
};

export const questVerifyGraphQL = createGraphQL(
  "questVerify" as const,
  QuestVerify,
  QuestVerifyInput,
  LightQuestVerify
);
export const {
  getQuestVerify,
  listQuestVerify,
  questVerifyCount,
  questVerifyExists,
  createQuestVerify,
  updateQuestVerify,
  removeQuestVerify,
  lightQuestVerifyFragment,
  questVerifyFragment,
  purifyQuestVerify,
  crystalizeQuestVerify,
  lightCrystalizeQuestVerify,
  defaultQuestVerify,
  addQuestVerifyFiles,
} = questVerifyGraphQL;
// * Apply QuestVerify Mutation
// export type ApplyQuestVerifyMutation = { applyQuestVerify: QuestVerify };
// export const applyQuestVerifyMutation = graphql`
//   ${questVerifyFragment}
//   mutation applyQuestVerify($questVerifyId: ID!) {
//     applyQuestVerify(questVerifyId: $questVerifyId) {
//       ...questVerifyFragment
//     }
//   }
// `;
// export const applyQuestVerify = async (questVerifyId: string) =>
//   crystalizeQuestVerify(
//     (await mutate<ApplyQuestVerifyMutation>(applyQuestVerifyMutation, { questVerifyId })).applyQuestVerify
//   );

export type ApproveQuestVerifyMutation = { approveQuestVerify: QuestVerify };
export const approveQuestVerifyMutation = graphql`
  ${questVerifyFragment}
  mutation approveQuestVerify($questVerifyId: ID!) {
    approveQuestVerify(questVerifyId: $questVerifyId) {
      ...questVerifyFragment
    }
  }
`;
export const approveQuestVerify = async (questVerifyId: string) =>
  crystalizeQuestVerify(
    (await mutate<ApproveQuestVerifyMutation>(approveQuestVerifyMutation, { questVerifyId })).approveQuestVerify
  );

export type UnApproveQuestVerifyMutation = { unApproveQuestVerify: QuestVerify };
export const unApproveQuestVerifyMutation = graphql`
  ${questVerifyFragment}
  mutation unApproveQuestVerify($questVerifyId: ID!) {
    unApproveQuestVerify(questVerifyId: $questVerifyId) {
      ...questVerifyFragment
    }
  }
`;
export const unApproveQuestVerify = async (questVerifyId: string) =>
  crystalizeQuestVerify(
    (await mutate<UnApproveQuestVerifyMutation>(unApproveQuestVerifyMutation, { questVerifyId })).unApproveQuestVerify
  );
// //
