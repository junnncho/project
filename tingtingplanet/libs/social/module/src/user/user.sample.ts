import * as Chance from "chance";
import * as db from "../db";
import * as gql from "../gql";
import * as srv from "../srv";
import { Id } from "@shared/util-server";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const userInput = (): gql.UserInput => ({
  nickname: c.word(),
  requestRoles: [],
});

