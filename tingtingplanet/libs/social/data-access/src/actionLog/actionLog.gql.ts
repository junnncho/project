import { BaseGql, Field, ID, InputType, Int, ObjectType, PickType, createGraphQL } from "@shared/util-client";
import { Utils, cnst } from "@shared/util";

@InputType("ActionLogInput")
export class ActionLogInput {
  @Field(() => String) // user, actionLog, comment, etc
  type: string;

  @Field(() => ID)
  target: string;

  @Field(() => ID)
  user: string;

  @Field(() => String)
  action: string; // like, comment, follow, unfollow, block, unblock, report, unreport, etc
}

@ObjectType("ActionLog", { _id: "id" })
export class ActionLog extends BaseGql(ActionLogInput) {
  @Field(() => Int)
  value: number;

  @Field(() => String)
  status: cnst.ActionLogStatus;
}

@ObjectType("LightActionLog", { _id: "id", gqlRef: "ActionLog" })
export class LightActionLog extends PickType(ActionLog, ["status"] as const) {}

@ObjectType("ActionLogSummary")
export class ActionLogSummary {
  @Field(() => Int)
  totalActionLog: number;

  @Field(() => Int)
  haActionLog: number;

  @Field(() => Int)
  daActionLog: number;

  @Field(() => Int)
  waActionLog: number;

  @Field(() => Int)
  maActionLog: number;
}

export const actionLogQueryMap: { [key in keyof ActionLogSummary]: any } = {
  totalActionLog: { status: { $ne: "inactive" } },
  haActionLog: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastHour() },
  },
  daActionLog: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastDays() },
  },
  waActionLog: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastWeeks() },
  },
  maActionLog: {
    status: { $ne: "inactive" },
    createdAt: { $gte: Utils.getLastMonths() },
  },
};

export const actionLogGraphQL = createGraphQL("actionLog" as const, ActionLog, ActionLogInput, LightActionLog);
export const {
  getActionLog,
  listActionLog,
  actionLogCount,
  actionLogExists,
  createActionLog,
  updateActionLog,
  removeActionLog,
  actionLogFragment,
  lightActionLogFragment,
  purifyActionLog,
  crystalizeActionLog,
  lightCrystalizeActionLog,
  defaultActionLog,
  mergeActionLog,
} = actionLogGraphQL;
