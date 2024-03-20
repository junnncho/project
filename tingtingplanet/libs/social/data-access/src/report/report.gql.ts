import {
  BaseGql,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PickType,
  createGraphQL,
  mutate,
} from "@shared/util-client";
import { Dayjs } from "dayjs";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import graphql from "graphql-tag";

@InputType("ReportInput")
export class ReportInput {
  @Field(() => ID, { nullable: true })
  root: string | null;

  @Field(() => String, { default: "general" })
  type: string;

  @Field(() => ID, { nullable: true })
  target: string | null;

  @Field(() => shared.User, { nullable: true })
  targetUser: shared.User | shared.LightUser | null;

  @Field(() => shared.User)
  from: shared.User | shared.LightUser;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [shared.File])
  files: shared.File[];
}

@ObjectType("Report", { _id: "id" })
export class Report extends BaseGql(ReportInput) {
  @Field(() => shared.Admin, { nullable: true })
  replyFrom: shared.Admin | shared.LightAdmin | null;

  @Field(() => String, { nullable: true })
  replyContent: string | null;

  @Field(() => Date)
  replyAt: Dayjs;

  @Field(() => String)
  status: cnst.ReportStatus;
}

@ObjectType("LightReport", { _id: "id", gqlRef: "Report" })
export class LightReport extends PickType(Report, [
  "type",
  "title",
  "targetUser",
  "from",
  "replyFrom",
  "status",
  "content",
] as const) {
  @Field(() => shared.LightUser)
  override targetUser: shared.LightUser | null;

  @Field(() => shared.LightUser)
  override from: shared.LightUser;

  @Field(() => shared.LightAdmin, { nullable: true })
  override replyFrom: shared.LightAdmin | null;
}

@ObjectType("ReportSummary")
export class ReportSummary {
  @Field(() => Int)
  totalReport: number;

  @Field(() => Int)
  activeReport: number;

  @Field(() => Int)
  inProgressReport: number;

  @Field(() => Int)
  resolvedReport: number;
}

export const reportGraphQL = createGraphQL("report" as const, Report, ReportInput, LightReport);
export const {
  getReport,
  listReport,
  reportCount,
  reportExists,
  createReport,
  updateReport,
  removeReport,
  reportFragment,
  lightReportFragment,
  purifyReport,
  crystalizeReport,
  lightCrystalizeReport,
  defaultReport,
  addReportFiles,
  mergeReport,
} = reportGraphQL;

export const reportQueryMap = {
  totalReport: { status: { $ne: "inactive" } },
  activeReport: { status: "active" },
  inProgressReport: { status: "inProgress" },
  resolvedReport: { status: "resolved" },
};

export type ProcessReportMutation = { processReport: Report };
export const processReportMutation = graphql`
  ${reportFragment}
  mutation processReport($reportId: ID!) {
    processReport(reportId: $reportId) {
      ...reportFragment
    }
  }
`;
export const processReport = async (reportId: string) =>
  (await mutate<ProcessReportMutation>(processReportMutation, { reportId })).processReport;

export type ResolveReportMutation = { resolveReport: Report };
export const resolveReportMutation = graphql`
  ${reportFragment}
  mutation resolveReport($reportId: ID!, $replyContent: String!) {
    resolveReport(reportId: $reportId, replyContent: $replyContent) {
      ...reportFragment
    }
  }
`;
export const resolveReport = async (reportId: string, replyContent: string) =>
  (
    await mutate<ResolveReportMutation>(resolveReportMutation, {
      reportId,
      replyContent,
    })
  ).resolveReport;
