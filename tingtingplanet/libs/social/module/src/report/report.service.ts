import * as Report from "./report.model";
import * as gql from "../gql";
import { Id, LoadConfig, LoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { srv as external } from "@external/module";
@Injectable()
export class ReportService extends LoadService<Report.Mdl, Report.Doc, Report.Input> {
  constructor(
    @InjectModel(Report.name)
    private readonly Report: Report.Mdl,
    private readonly discordService: external.DiscordService
  ) {
    super(ReportService.name, Report);
  }
  override async create(data: gql.ReportInput, { account }: LoadConfig<Report.Doc> = {}) {
    // if (await this.Report.exists({ type: data.type, target: data.target, from: data.from }))
    //   throw new Error("Already Reported"); // TODO: 이미 신고한 경우 다른 상태로 넘겨야할듯
    this.discordService.log(`Report Created`);
    return await new this.Report(data).save();
  }
  async process(reportId: Id, adminId: Id) {
    const report = await this.Report.pickById(reportId);
    return await report.process(adminId).save();
  }
  async resolve(reportId: Id, replyContent: string, adminId: Id) {
    const report = await this.Report.pickById(reportId);
    return await report.resolve(adminId, replyContent).save();
  }
  async summarize(): Promise<gql.ReportSummary> {
    return {
      totalReport: await this.Report.countDocuments({
        status: { $ne: "inactive" },
      }),
      activeReport: await this.Report.countDocuments({ status: "active" }),
      inProgressReport: await this.Report.countDocuments({
        status: "inProgress",
      }),
      resolvedReport: await this.Report.countDocuments({ status: "resolved" }),
    };
  }
}
