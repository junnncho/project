import { TestSystem } from "@shared/test-server";
import { JobService } from "./job.service";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("Job Service", () => {
  const system = new TestSystem();
  let jobService: JobService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    jobService = app.get<JobService>(JobService);
  });
  afterAll(async () => await system.terminate());
  let job: db.Job.Doc;

  let input: gql.JobInput;
  it("Create Job", async () => {
    input = sample.jobInput();
    job = await jobService.create(input);
    expect(job.status).toEqual("active");
  });
  it("Update Job", async () => {
    input = sample.jobInput();
    job = await jobService.update(job._id, input);
  });
  it("Remove Job", async () => {
    job = await jobService.remove(job._id);
    expect(job.status).toEqual("inactive");
  });
});
