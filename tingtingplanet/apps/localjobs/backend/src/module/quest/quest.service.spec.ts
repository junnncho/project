import { TestSystem } from "@shared/test-server";
import { QuestService } from "./quest.service";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("Quest Service", () => {
  const system = new TestSystem();
  let questService: QuestService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    questService = app.get<QuestService>(QuestService);
  });
  afterAll(async () => await system.terminate());
  let quest: db.Quest.Doc;

  let input: gql.QuestInput;
  it("Create Quest", async () => {
    input = sample.questInput();
    quest = await questService.create(input);
    expect(quest.status).toEqual("active");
  });
  it("Update Quest", async () => {
    input = sample.questInput();
    quest = await questService.update(quest._id, input);
  });
  it("Remove Quest", async () => {
    quest = await questService.remove(quest._id);
    expect(quest.status).toEqual("inactive");
  });
});
