import * as gql from "../gql";
import * as srv from "../srv";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { JobService } from "./job.service";
import { Logger, UseGuards } from "@nestjs/common";
import { gql as shared } from "@shared/module";
import { ChatBoard } from "libs/social/module/src/db";

@Resolver(() => gql.Job)
export class JobResolver extends BaseResolver(gql.Job, gql.JobInput, Allow.Every, Allow.Every, Allow.Every) {
  constructor(
    private readonly jobService: JobService,
    private readonly fileService: srv.shared.FileService,
    private readonly userService: srv.shared.UserService,
    private readonly chatBoardService: srv.social.ChatBoardService
  ) {
    super(jobService);
  }
  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addJobFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "jobId", type: () => ID, nullable: true })
    jobId?: string
  ) {
    Logger.debug(`custom-resolver:addJobFiles: input{job:${jobId}}`);
    return await this.fileService.addFiles(files, "jobFiles", jobId);
  }

  @Mutation(() => gql.Job)
  @UseGuards(Allow.User)
  async reserveJob(
    @Args({ name: "jobId", type: () => ID }) jobId: string,
    @Args({ name: "userId", type: () => ID }) userId: string
  ) {
    Logger.debug(`custom-resolver:reserveJob: input{job:${jobId} user:${userId}}`);
    return await this.jobService.reserveJob(new Id(jobId), new Id(userId));
  }

  @Mutation(() => gql.Job)
  @UseGuards(Allow.User)
  async unReserveJob(
    @Args({ name: "jobId", type: () => ID }) jobId: string,
    @Args({ name: "userId", type: () => ID }) userId: string
  ) {
    Logger.debug(`custom-resolver:unReserveJob: input{job:${jobId} user:${userId}}`);
    return await this.jobService.unReserveJob(new Id(jobId), new Id(userId));
  }

  @Mutation(() => gql.Job)
  @UseGuards(Allow.User)
  async applyJob(@Args({ name: "jobId", type: () => ID }) jobId: string, @RequiredAuth() account: Account) {
    Logger.debug(`custom-resolver:applyJob: input{job:${jobId} user:${account._id.toString()}}`);
    return await this.jobService.applyJob(new Id(jobId), account._id);
  }

  @ResolveField(() => gql.shared.User)
  async employer(@Parent() job: gql.Job) {
    return await this.userService.load(job.employer);
  }

  @ResolveField(() => [gql.shared.User])
  async maleReservers(@Parent() job: gql.Job) {
    return await this.userService.loadMany(job.maleReservers);
  }

  @ResolveField(() => [gql.shared.User])
  async femaleReservers(@Parent() job: gql.Job) {
    return await this.userService.loadMany(job.femaleReservers);
  }

  @ResolveField(() => [gql.shared.User])
  async maleApplicants(@Parent() job: gql.Job) {
    return await this.userService.loadMany(job.maleApplicants);
  }

  @ResolveField(() => [gql.shared.User])
  async femaleApplicants(@Parent() job: gql.Job) {
    return await this.userService.loadMany(job.femaleApplicants);
  }

  @ResolveField(() => Int)
  async totalFemaleApplicants(@Parent() job: gql.Job) {
    return job.femaleApplicants.length;
  }

  @ResolveField(() => Int)
  async totalMaleApplicants(@Parent() job: gql.Job) {
    return job.maleApplicants.length;
  }

  @ResolveField(() => Int)
  async totalFemaleReserver(@Parent() job: gql.Job) {
    return job.femaleReservers.length;
  }

  @ResolveField(() => Int)
  async totalMaleReserver(@Parent() job: gql.Job) {
    return job.maleReservers.length;
  }

  @ResolveField(() => [shared.File])
  async thumbnails(@Parent() job: gql.Job) {
    return await this.fileService.loadMany(job.thumbnails || []);
  }
}
