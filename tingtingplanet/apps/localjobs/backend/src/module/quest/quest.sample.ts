import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const questInput = (): gql.QuestInput => ({} as any);

export const createQuest = async (app: TestingModule) => {
  const questService = app.get<srv.QuestService>(srv.QuestService);
  const quest = await questService.create(questInput());
  return quest;
};
