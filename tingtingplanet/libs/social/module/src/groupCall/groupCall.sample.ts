import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const groupCallInput = (): gql.GroupCallInput => ({} as any);

export const createGroupCall = async (app: TestingModule) => {
  const groupCallService = app.get<srv.GroupCallService>(srv.GroupCallService);
  const groupCall = await groupCallService.create(groupCallInput());
  return groupCall;
};
