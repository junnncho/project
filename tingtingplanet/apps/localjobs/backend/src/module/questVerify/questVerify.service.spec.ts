import { TestSystem } from "@shared/test-server";
import { QuestVerifyService } from "./questVerify.service";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("QuestVerify Service", () => {
  const system = new TestSystem();
  let questVerifyService: QuestVerifyService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    questVerifyService = app.get<QuestVerifyService>(QuestVerifyService);
  });
  afterAll(async () => await system.terminate());
  let questVerify: db.QuestVerify.Doc;

  let input: gql.QuestVerifyInput;
  it("Create QuestVerify", async () => {
    input = sample.questVerifyInput();
    questVerify = await questVerifyService.create(input);
    expect(questVerify.status).toEqual("active");
  });
  it("Update QuestVerify", async () => {
    input = sample.questVerifyInput();
    questVerify = await questVerifyService.update(questVerify._id, input);
  });
  it("Remove QuestVerify", async () => {
    questVerify = await questVerifyService.remove(questVerify._id);
    expect(questVerify.status).toEqual("inactive");
  });
});
