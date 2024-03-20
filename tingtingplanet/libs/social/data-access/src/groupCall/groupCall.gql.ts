import {
  BaseGql,
  Field,
  InputOf,
  InputType,
  Int,
  ObjectType,
  PickType,
  createGraphQL,
  mutate,
} from "@shared/util-client";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import graphql from "graphql-tag";

@InputType("GroupCallInput")
export class GroupCallInput {
  @Field(() => String)
  type: cnst.GroupCallType;

  @Field(() => String)
  roomId: string;
}

@ObjectType("GroupCall", { _id: "id" })
export class GroupCall extends BaseGql(GroupCallInput) {
  @Field(() => String)
  status: cnst.GroupCallStatus;

  @Field(() => [shared.LightUser])
  users: shared.LightUser[];
}

@ObjectType("LightGroupCall", { _id: "id", gqlRef: "GroupCall" })
export class LightGroupCall extends PickType(GroupCall, ["roomId", "status"] as const) {}

@ObjectType("GroupCallSummary")
export class GroupCallSummary {
  @Field(() => Int)
  totalGroupCall: number;
}

export const groupCallQueryMap: { [key in keyof GroupCallSummary]: any } = {
  totalGroupCall: { status: { $ne: "inactive" } },
};

export const groupCallGraphQL = createGraphQL("groupCall" as const, GroupCall, GroupCallInput, LightGroupCall);
export const {
  getGroupCall,
  listGroupCall,
  groupCallCount,
  groupCallExists,
  createGroupCall,
  updateGroupCall,
  removeGroupCall,
  groupCallFragment,
  lightGroupCallFragment,
  purifyGroupCall,
  crystalizeGroupCall,
  lightCrystalizeGroupCall,
  defaultGroupCall,
  mergeGroupCall,
} = groupCallGraphQL;

// * Close Listing Mutation
export type GenerateGroupCallMutation = { generateGroupCall: GroupCall };
export const generateGroupCallMutation = graphql`
  ${groupCallFragment}
  mutation generateGroupCall($data: GroupCallInput!) {
    generateGroupCall(data: $data) {
      ...groupCallFragment
    }
  }
`;
export const generateGroupCall = async (data: InputOf<GroupCallInput>) =>
  (await mutate<GenerateGroupCallMutation>(generateGroupCallMutation, { data })).generateGroupCall;
