import * as Chance from "chance";
import * as gql from "../gql";
import { BoardService } from "./board.service";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const boardInput = (): gql.BoardInput => ({
  name: c.word(),
  description: c.sentence(),
  categories: [],
  policy: [],
  roles: ["user", "admin", "root"],
  viewStyle: "list",
});
export const createBoard = async (app: TestingModule) => {
  const boardService = app.get<BoardService>(BoardService);
  const board = await boardService.create(boardInput());
  return board;
};
