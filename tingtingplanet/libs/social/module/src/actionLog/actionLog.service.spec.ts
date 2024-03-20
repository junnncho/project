import { ActionLogService } from "./actionLog.service";
import { TestSystem } from "@shared/test-server";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("ActionLog Service", () => {
  const system = new TestSystem();
  let actionLogService: ActionLogService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    actionLogService = app.get<ActionLogService>(ActionLogService);
  });
  afterAll(async () => await system.terminate());
  let actionLog: db.ActionLog.Doc;

  let input: gql.ActionLogInput;
  it("Create ActionLog", async () => {
    input = sample.actionLogInput();
    actionLog = await actionLogService.create(input);
    expect(actionLog.status).toEqual("active");
  });
  it("Update ActionLog", async () => {
    input = sample.actionLogInput();
    actionLog = await actionLogService.update(actionLog._id, input);
  });
  it("Remove ActionLog", async () => {
    actionLog = await actionLogService.remove(actionLog._id);
    expect(actionLog.status).toEqual("inactive");
  });
});
