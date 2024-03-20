import { BaseGql, Field, InputType, Int, ObjectType, PickType, createGraphQL, mutate, ID } from "@shared/util-client";
import { LightUser, User } from "../user/user.gql";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import { gql as social } from "@social/data-access";
import dayjs, { Dayjs } from "dayjs";
import graphql from "graphql-tag";
import { ChatBoard, LightChatBoard } from "libs/social/data-access/src/gql";

@InputType("JobInput")
export class JobInput {
  @Field(() => String)
  name: string;

  @Field(() => ID, { nullable: true })
  chatBoard?: string | null;

  @Field(() => User)
  employer: User | LightUser;

  @Field(() => Date, { default: dayjs().set("hour", 7) })
  due: Dayjs;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  kind: string;

  @Field(() => Int)
  pay: number;

  @Field(() => Int)
  term: number;

  @Field(() => Int)
  point: number;

  @Field(() => [shared.File], { nullable: true })
  thumbnails: shared.File[] | null;

  @Field(() => String)
  content: string;

  @Field(() => String)
  required: string;

  @Field(() => [shared.File])
  contentFiles: shared.File[];

  @Field(() => [shared.File])
  requiredFiles: shared.File[];

  @Field(() => Int, { default: 0 })
  maxMaleReserver: number;

  @Field(() => Int, { default: 0 })
  maxFemaleReserver: number;

  @Field(() => Boolean, { default: true })
  distinctGender: boolean;
}

@ObjectType("Job", { _id: "id" })
export class Job extends BaseGql(JobInput) {
  @Field(() => String)
  status: cnst.JobStatus;

  @Field(() => Int, { default: 0 })
  totalFemaleReserver: number;

  @Field(() => Int, { default: 0 })
  totalMaleReserver: number;

  @Field(() => Int, { default: 0 })
  totalFemaleApplicant: number;

  @Field(() => Int, { default: 0 })
  totalMaleApplicant: number;

  @Field(() => [User])
  femaleReservers: User[] | LightUser[];

  @Field(() => [User])
  maleReservers: User[] | LightUser[];

  @Field(() => [User])
  femaleApplicants: User[] | LightUser[];

  @Field(() => [User])
  maleApplicants: User[] | LightUser[];
}

@ObjectType("LightJob", { _id: "id", gqlRef: "Job" })
export class LightJob extends PickType(Job, [
  "status",
  "name",
  "chatBoard",
  "maxFemaleReserver",
  "maxMaleReserver",
  "totalFemaleReserver",
  "phone",
  "totalMaleReserver",
  "chatBoard",
  "thumbnails",
] as const) {}

@ObjectType("JobSummary")
export class JobSummary {
  @Field(() => Int)
  totalJob: number;
}

export const jobQueryMap: { [key in keyof JobSummary]: any } = {
  totalJob: { status: { $ne: "inactive" } },
};

export const jobGraphQL = createGraphQL("job" as const, Job, JobInput, LightJob);
export const {
  getJob,
  listJob,
  jobCount,
  jobExists,
  createJob,
  updateJob,
  removeJob,
  lightJobFragment,
  jobFragment,
  purifyJob,
  crystalizeJob,
  lightCrystalizeJob,
  defaultJob,
  addJobFiles,
} = jobGraphQL;
// * Apply Job Mutation
export type ApplyJobMutation = { applyJob: Job };
export const applyJobMutation = graphql`
  ${jobFragment}
  mutation applyJob($jobId: ID!) {
    applyJob(jobId: $jobId) {
      ...jobFragment
    }
  }
`;
export const applyJob = async (jobId: string) =>
  crystalizeJob((await mutate<ApplyJobMutation>(applyJobMutation, { jobId })).applyJob);

export type ReserveJobMutation = { reserveJob: Job };
export const reserveJobMutation = graphql`
  ${jobFragment}
  mutation reserveJob($jobId: ID!, $userId: ID!) {
    reserveJob(jobId: $jobId, userId: $userId) {
      ...jobFragment
    }
  }
`;
export const reserveJob = async (jobId: string, userId: string) =>
  crystalizeJob((await mutate<ReserveJobMutation>(reserveJobMutation, { jobId, userId })).reserveJob);

export type UnReserveJobMutation = { unReserveJob: Job };
export const unReserveJobMutation = graphql`
  ${jobFragment}
  mutation unReserveJob($jobId: ID!, $userId: ID!) {
    unReserveJob(jobId: $jobId, userId: $userId) {
      ...jobFragment
    }
  }
`;
export const unReserveJob = async (jobId: string, userId: string) =>
  crystalizeJob((await mutate<UnReserveJobMutation>(unReserveJobMutation, { jobId, userId })).unReserveJob);
