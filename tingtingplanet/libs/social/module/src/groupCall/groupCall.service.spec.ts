import { GroupCallService } from "./groupCall.service";
import { TestSystem } from "@shared/test-server";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("GroupCall Service", () => {
  const system = new TestSystem();
  let groupCallService: GroupCallService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    groupCallService = app.get<GroupCallService>(GroupCallService);
  });
  afterAll(async () => await system.terminate());
  let groupCall: db.GroupCall.Doc;

  let input: gql.GroupCallInput;
  it("Create GroupCall", async () => {
    input = sample.groupCallInput();
    groupCall = await groupCallService.create(input);
    expect(groupCall.status).toEqual("active");
  });
  it("Update GroupCall", async () => {
    input = sample.groupCallInput();
    groupCall = await groupCallService.update(groupCall._id, input);
  });
  it("Remove GroupCall", async () => {
    groupCall = await groupCallService.remove(groupCall._id);
    expect(groupCall.status).toEqual("inactive");
  });
});
