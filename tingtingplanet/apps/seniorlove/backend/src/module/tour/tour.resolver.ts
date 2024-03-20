import * as gql from "../gql";
import * as srv from "../srv";
import { Account, Allow, BaseResolver, Id, RequiredAuth } from "@shared/util-server";
import { Args, ID, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { TourService } from "./tour.service";
import { Logger, UseGuards } from "@nestjs/common";
import { gql as shared } from "@shared/module";
import { ChatBoard } from "libs/social/module/src/db";

@Resolver(() => gql.Tour)
export class TourResolver extends BaseResolver(gql.Tour, gql.TourInput, Allow.Every, Allow.Every, Allow.Every) {
  constructor(
    private readonly tourService: TourService,
    private readonly fileService: srv.shared.FileService,
    private readonly userService: srv.shared.UserService,
    private readonly chatBoardService: srv.social.ChatBoardService
  ) {
    super(tourService);
  }
  @Mutation(() => [gql.shared.File])
  @UseGuards(Allow.Every)
  async addTourFiles(
    @Args({ name: "files", type: () => [gql.shared.FileUpload] })
    files: gql.shared.FileUpload[],
    @Args({ name: "tourId", type: () => ID, nullable: true })
    tourId?: string
  ) {
    Logger.debug(`custom-resolver:addTourFiles: input{tour:${tourId}}`);
    return await this.fileService.addFiles(files, "tourFiles", tourId);
  }

  @Mutation(() => gql.Tour)
  @UseGuards(Allow.User)
  async reserveTour(
    @Args({ name: "tourId", type: () => ID }) tourId: string,
    @Args({ name: "userId", type: () => ID }) userId: string
  ) {
    Logger.debug(`custom-resolver:reserveTour: input{tour:${tourId} user:${userId}}`);
    return await this.tourService.reserveTour(new Id(tourId), new Id(userId));
  }

  @Mutation(() => gql.Tour)
  @UseGuards(Allow.User)
  async unReserveTour(
    @Args({ name: "tourId", type: () => ID }) tourId: string,
    @Args({ name: "userId", type: () => ID }) userId: string
  ) {
    Logger.debug(`custom-resolver:unReserveTour: input{tour:${tourId} user:${userId}}`);
    return await this.tourService.unReserveTour(new Id(tourId), new Id(userId));
  }

  @Mutation(() => gql.Tour)
  @UseGuards(Allow.User)
  async applyTour(@Args({ name: "tourId", type: () => ID }) tourId: string, @RequiredAuth() account: Account) {
    Logger.debug(`custom-resolver:applyTour: input{tour:${tourId} user:${account._id.toString()}}`);
    return await this.tourService.applyTour(new Id(tourId), account._id);
  }

  @ResolveField(() => gql.shared.User)
  async driver(@Parent() tour: gql.Tour) {
    return await this.userService.load(tour.driver);
  }

  @ResolveField(() => [gql.shared.User])
  async maleReservers(@Parent() tour: gql.Tour) {
    return await this.userService.loadMany(tour.maleReservers);
  }

  @ResolveField(() => [gql.shared.User])
  async femaleReservers(@Parent() tour: gql.Tour) {
    return await this.userService.loadMany(tour.femaleReservers);
  }

  @ResolveField(() => [gql.shared.User])
  async maleApplicants(@Parent() tour: gql.Tour) {
    return await this.userService.loadMany(tour.maleApplicants);
  }

  @ResolveField(() => [gql.shared.User])
  async femaleApplicants(@Parent() tour: gql.Tour) {
    return await this.userService.loadMany(tour.femaleApplicants);
  }

  @ResolveField(() => Int)
  async totalFemaleApplicants(@Parent() tour: gql.Tour) {
    return tour.femaleApplicants.length;
  }

  @ResolveField(() => Int)
  async totalMaleApplicants(@Parent() tour: gql.Tour) {
    return tour.maleApplicants.length;
  }

  @ResolveField(() => Int)
  async totalFemaleReserver(@Parent() tour: gql.Tour) {
    return tour.femaleReservers.length;
  }

  @ResolveField(() => Int)
  async totalMaleReserver(@Parent() tour: gql.Tour) {
    return tour.maleReservers.length;
  }

  @ResolveField(() => [shared.File])
  async thumbnails(@Parent() tour: gql.Tour) {
    return await this.fileService.loadMany(tour.thumbnails || []);
  }
}
