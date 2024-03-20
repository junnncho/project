import { ReportService } from "./report.service";
import { TestSystem } from "@shared/test-server";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("Report Service", () => {
  const system = new TestSystem();
  let reportService: ReportService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    reportService = app.get<ReportService>(ReportService);
  });
  afterAll(async () => await system.terminate());
  let report: db.Report.Doc;

  let input: gql.ReportInput;
  it("Create Report", async () => {
    input = sample.reportInput();
    report = await reportService.create(input);
    expect(report.status).toEqual("active");
  });
  it("Update Report", async () => {
    input = sample.reportInput();
    report = await reportService.update(report._id, input);
  });
  it("Remove Report", async () => {
    report = await reportService.remove(report._id);
    expect(report.status).toEqual("inactive");
  });
});
