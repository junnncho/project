import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const jobInput = (): gql.JobInput => ({} as any);

export const createJob = async (app: TestingModule) => {
  const jobService = app.get<srv.JobService>(srv.JobService);
  const job = await jobService.create(jobInput());
  return job;
};
