import { TestSystem } from "@shared/test-server";
import { UserService } from "./user.service";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("User Service", () => {
  const system = new TestSystem();
  let userService: UserService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    userService = app.get<UserService>(UserService);
  });
  afterAll(async () => await system.terminate());
  let user: db.User.Doc;

  let input: gql.UserInput;
  it("Create User", async () => {
    input = sample.userInput();
    user = await userService.create(input);
    expect(user.status).toEqual("active");
  });
  it("Update User", async () => {
    input = sample.userInput();
    user = await userService.update(user._id, input);
  });
  it("Remove User", async () => {
    user = await userService.remove(user._id);
    expect(user.status).toEqual("inactive");
  });
});
