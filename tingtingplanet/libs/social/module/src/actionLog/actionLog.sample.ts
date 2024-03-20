import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { Id } from "@shared/util-server";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const actionLogInput = (type: string, target: Id, user: Id): gql.ActionLogInput => ({
  type,
  target,
  user,
  action: "like",
});

export const createActionLog = async (app: TestingModule, type: string, target: Id, user: Id) => {
  const actionLogService = app.get<srv.ActionLogService>(srv.ActionLogService);
  const actionLog = await actionLogService.create(actionLogInput(type, target, user));
  return actionLog;
};
