import * as Board from "./board.model";
import * as gql from "../gql";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadService } from "@shared/util-server";
// import * as db from "../db";

@Injectable()
export class BoardService extends LoadService<Board.Mdl, Board.Doc, Board.Input> {
  constructor(
    @InjectModel(Board.name)
    private readonly Board: Board.Mdl
  ) {
    super(BoardService.name, Board);
  }
  async summarize(): Promise<gql.BoardSummary> {
    return {
      totalBoard: await this.Board.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
