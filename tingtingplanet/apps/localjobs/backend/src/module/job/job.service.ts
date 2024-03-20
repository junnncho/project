import * as Job from "./job.model";
import * as gql from "../gql";
import { Id, LoadService, LoadConfig, AddrLoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PushService } from "../push/push.service";

@Injectable()
export class JobService extends LoadService<Job.Mdl, Job.Doc, Job.Input> {
  constructor(
    @InjectModel(Job.name)
    private readonly Job: Job.Mdl,
    private readonly userService: UserService,
    private readonly pushService: PushService
  ) {
    super(JobService.name, Job);
  }
  async summarize(): Promise<gql.JobSummary> {
    return {
      totalJob: await this.Job.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }

  async reserveJob(jobId: Id, userId: Id) {
    // Logger.debug(",)
    Logger.debug(`service:reserveJob model:JobService input:{jobId: ${jobId} userId: ${userId}}`);
    const [job, reserver] = await Promise.all([this.load(jobId), this.userService.load(userId)]);
    if (!job) throw new Error("Job not found");
    if (!reserver) throw new Error("User not found");
    await job.reserve(userId, reserver.gender).save();
    if (reserver.mobileToken)
      await this.pushService.sendNotification({
        to: reserver.mobileToken,
        title: job.name,
        body: `${reserver.nickname}님, 예약이 승인되었습니다.`,
      });
    return job;
  }

  async unReserveJob(jobId: Id, userId: Id, { account, address, ip }: LoadConfig<Job.Doc> = {}) {
    Logger.debug(`service:unReserveJob model:JobService input:{jobId: ${jobId} userId: ${userId}}`);
    const [job, reserver] = await Promise.all([this.load(jobId), this.userService.load(userId)]);
    if (!job) throw new Error("Job not found");
    if (!reserver) throw new Error("User not found");
    await job.unReserve(userId, reserver.gender).save();
    const employer = await this.userService.load(job.employer);
    if (!employer) throw new Error("Employer not found");
    if (employer.mobileToken)
      await this.pushService.sendNotification({
        to: employer.mobileToken,
        title: job.name,
        body: `${reserver.nickname}님이 예약을 취소하였습니다.`,
      });
    return job;
  }

  async applyJob(jobId: Id, userId: Id) {
    Logger.debug(`service:applyJob model:JobService input:{jobId: ${jobId} userId: ${userId}}`);
    const [job, applicant] = await Promise.all([this.load(jobId), this.userService.load(userId)]);
    if (!job) throw new Error("Job not found");
    if (!applicant) throw new Error("User not found");
    await job.apply(userId, applicant.gender).save();
    const employer = await this.userService.load(job.employer);
    if (!employer) throw new Error("Employer not found");
    if (employer.mobileToken)
      await this.pushService.sendNotification({
        to: employer.mobileToken,
        title: job.name,
        body: `${applicant.nickname}의 예약신청이 접수되었습니다.`,
      });
    return job;
  }
}
