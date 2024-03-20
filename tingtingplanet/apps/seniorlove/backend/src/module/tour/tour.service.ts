import * as Tour from "./tour.model";
import * as gql from "../gql";
import { Id, LoadService, LoadConfig, AddrLoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PushService } from "../push/push.service";

@Injectable()
export class TourService extends LoadService<Tour.Mdl, Tour.Doc, Tour.Input> {
  constructor(
    @InjectModel(Tour.name)
    private readonly Tour: Tour.Mdl,
    private readonly userService: UserService,
    private readonly pushService: PushService
  ) {
    super(TourService.name, Tour);
  }
  async summarize(): Promise<gql.TourSummary> {
    return {
      totalTour: await this.Tour.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }

  async reserveTour(tourId: Id, userId: Id) {
    // Logger.debug(",)
    Logger.debug(`service:reserveTour model:TourService input:{tourId: ${tourId} userId: ${userId}}`);
    const [tour, reserver] = await Promise.all([this.load(tourId), this.userService.load(userId)]);
    if (!tour) throw new Error("Tour not found");
    if (!reserver) throw new Error("User not found");
    await tour.reserve(userId, reserver.gender).save();
    if (reserver.mobileToken)
      await this.pushService.sendNotification({
        to: reserver.mobileToken,
        title: tour.name,
        body: `${reserver.nickname}님, 예약이 승인되었습니다.`,
      });
    return tour;
  }

  async unReserveTour(tourId: Id, userId: Id, { account, address, ip }: LoadConfig<Tour.Doc> = {}) {
    Logger.debug(`service:unReserveTour model:TourService input:{tourId: ${tourId} userId: ${userId}}`);
    const [tour, reserver] = await Promise.all([this.load(tourId), this.userService.load(userId)]);
    if (!tour) throw new Error("Tour not found");
    if (!reserver) throw new Error("User not found");
    await tour.unReserve(userId, reserver.gender).save();
    const driver = await this.userService.load(tour.driver);
    if (!driver) throw new Error("Driver not found");
    if (driver.mobileToken)
      await this.pushService.sendNotification({
        to: driver.mobileToken,
        title: tour.name,
        body: `${reserver.nickname}님이 예약을 취소하였습니다.`,
      });
    return tour;
  }

  async applyTour(tourId: Id, userId: Id) {
    Logger.debug(`service:applyTour model:TourService input:{tourId: ${tourId} userId: ${userId}}`);
    const [tour, applicant] = await Promise.all([this.load(tourId), this.userService.load(userId)]);
    if (!tour) throw new Error("Tour not found");
    if (!applicant) throw new Error("User not found");
    await tour.apply(userId, applicant.gender).save();
    const driver = await this.userService.load(tour.driver);
    if (!driver) throw new Error("Driver not found");
    if (driver.mobileToken)
      await this.pushService.sendNotification({
        to: driver.mobileToken,
        title: tour.name,
        body: `${applicant.nickname}의 예약신청이 접수되었습니다.`,
      });
    return tour;
  }
}
