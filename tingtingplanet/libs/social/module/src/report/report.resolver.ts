import * as gql from "../gql";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ReportService } from "./report.service";
import { UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { srv as shared } from "@shared/module";

@Resolver(() => gql.Report)
export class ReportResolver extends BaseResolver(gql.Report, gql.ReportInput, Allow.Every, Allow.Every, Allow.Every) {
  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService,
    private readonly fileService: shared.FileService,
    private readonly adminService: shared.AdminService
  ) {
    super(reportService);
  }
  @Mutation(() => gql.Report)
  @UseGuards(Allow.Admin)
  async processReport(@Args({ name: "reportId", type: () => ID }) reportId: string, @RequiredAuth() account: Account) {
    return await this.reportService.process(new Id(reportId), account._id);
  }
  @Mutation(() => gql.Report)
  @UseGuards(Allow.Admin)
  async resolveReport(
    @Args({ name: "reportId", type: () => ID }) reportId: string,
    @Args({ name: "replyContent", type: () => String }) replyContent: string,
    @RequiredAuth() account: Account
  ) {
    return await this.reportService.resolve(new Id(reportId), replyContent, account._id);
  }
  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addReportFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "reportId", type: () => ID, nullable: true })
    reportId?: string
  ) {
    return await this.fileService.addFiles(files, "report", reportId);
  }
  @ResolveField(() => gql.shared.User)
  async targetUser(@Parent() report: gql.Report) {
    return await this.userService.load(report.targetUser);
  }
  @ResolveField(() => gql.shared.User)
  async from(@Parent() report: gql.Report) {
    return await this.userService.load(report.from);
  }
  @ResolveField(() => gql.shared.Admin, { nullable: true })
  async replyFrom(@Parent() report: gql.Report) {
    return await this.adminService.load(report.replyFrom);
  }
  @ResolveField(() => gql.shared.User)
  async files(@Parent() report: gql.Report) {
    return await this.fileService.loadMany(report.files);
  }
}
