import * as ActionLog from "./actionLog.model";
import * as gql from "../gql";
import { DataLoader, Id, LoadService, createQueryLoader } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Utils } from "@shared/util";
@Injectable()
export class ActionLogService extends LoadService<ActionLog.Mdl, ActionLog.Doc, ActionLog.Input> {
  queryLoader: DataLoader<{ action: string; user: Id; target: Id }, ActionLog.Doc>;
  constructor(
    @InjectModel(ActionLog.name)
    private readonly ActionLog: ActionLog.Mdl
  ) {
    super(ActionLogService.name, ActionLog);
    this.queryLoader = createQueryLoader(ActionLog, ["action", "user", "target"]);
  }
  async queryLoad(query: { action: string; user: Id; target: Id }) {
    return await this.queryLoader.load(query);
  }
  async add(data: ActionLog.Input) {
    const actionLog = await this.ActionLog.browse(data);
    return await actionLog.addValue();
  }
  async sub(data: ActionLog.Input) {
    const actionLog = await this.ActionLog.browse(data);
    return await actionLog.subValue();
  }
  async set(data: ActionLog.Input, value: number) {
    const actionLog = await this.ActionLog.browse(data);
    return await actionLog.setValue(value);
  }
  async summarize(): Promise<gql.ActionLogSummary> {
    return {
      totalActionLog: await this.ActionLog.countDocuments({
        status: { $ne: "inactive" },
      }),
      haActionLog: await this.ActionLog.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastHour() },
      }),
      daActionLog: await this.ActionLog.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastDays() },
      }),
      waActionLog: await this.ActionLog.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastWeeks() },
      }),
      maActionLog: await this.ActionLog.countDocuments({
        status: { $ne: "inactive" },
        createdAt: { $gte: Utils.getLastMonths() },
      }),
    };
  }
}
