import {
  BaseGql,
  Field,
  InputType,
  Int,
  ObjectType,
  PickType,
  createGraphQL,
} from "@shared/util-client";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";

@InputType("BoardInput")
export class BoardInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  categories: string[];

  @Field(() => [String], { default: ["autoApprove"] })
  policy: cnst.BoardPolicy[];

  @Field(() => [String], { default: ["root", "board", "user"] })
  roles: cnst.UserRole[];

  @Field(() => String, { default: "list" })
  viewStyle: cnst.BoardViewStyle;
}

@ObjectType("Board", { _id: "id" })
export class Board extends BaseGql(BoardInput) {
  @Field(() => String)
  status: cnst.BoardStatus;

  static getFromNames(boardList: LightBoard[], names: string[]) {
    return boardList
      .filter((board) => names.includes(board.name))
      .sort((a, b) => names.indexOf(a.name) - names.indexOf(b.name));
  }
  static getBoard(boardList: LightBoard[] | "loading", boardId: string) {
    if (boardList === "loading") return "loading";
    return boardList.find((board) => board.id === boardId) ?? "loading";
  }
  isPrivate() {
    return this.policy.includes("private");
  }
  canWrite(user: shared.User) {
    return this.roles.some((role) => user.roles.includes(role));
  }
}

@ObjectType("LightBoard", { _id: "id", gqlRef: "Board" })
export class LightBoard extends PickType(Board, [
  "name",
  "description",
  "categories",
  "viewStyle",
  "policy",
  "roles",
] as const) {}

@ObjectType("BoardSummary")
export class BoardSummary {
  @Field(() => Int)
  totalBoard: number;
}

export const boardQueryMap: { [key in keyof BoardSummary]: any } = {
  totalBoard: { status: { $ne: "inactive" } },
};

export const boardGraphQL = createGraphQL("board" as const, Board, BoardInput, LightBoard);
export const {
  getBoard,
  listBoard,
  boardCount,
  boardExists,
  createBoard,
  updateBoard,
  removeBoard,
  boardFragment,
  purifyBoard,
  crystalizeBoard,
  lightCrystalizeBoard,
  defaultBoard,
  mergeBoard,
} = boardGraphQL;
