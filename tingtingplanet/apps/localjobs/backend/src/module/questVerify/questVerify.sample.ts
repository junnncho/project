import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const questVerifyInput = (): gql.QuestVerifyInput => ({} as any);

export const createQuestVerify = async (app: TestingModule) => {
  const questVerifyService = app.get<srv.QuestVerifyService>(srv.QuestVerifyService);
  const questVerify = await questVerifyService.create(questVerifyInput());
  return questVerify;
};
