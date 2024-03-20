import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { Id } from "@shared/util-server";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const reportInput = (): gql.ReportInput => ({
  type: "test",
  target: new Id(),
  targetUser: new Id(),
  from: new Id(),
  title: "test",
  content: "test",
  files: [],
});

export const createReport = async (app: TestingModule) => {
  const reportService = app.get<srv.ReportService>(srv.ReportService);
  const report = await reportService.create(reportInput());
  return report;
};
