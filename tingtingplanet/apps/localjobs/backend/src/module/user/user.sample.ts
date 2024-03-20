import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const userInput = (): gql.UserInput => ({} as any);

export const createUser = async (app: TestingModule) => {
  const userService = app.get<srv.UserService>(srv.UserService);
  const user = await userService.create(userInput());
  return user;
};
