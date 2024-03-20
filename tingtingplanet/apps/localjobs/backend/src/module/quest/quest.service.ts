import * as Quest from "./quest.model";
import * as gql from "../gql";
import { Id, LoadService, LoadConfig, AddrLoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PushService } from "../push/push.service";

@Injectable()
export class QuestService extends LoadService<Quest.Mdl, Quest.Doc, Quest.Input> {
  constructor(
    @InjectModel(Quest.name)
    private readonly Quest: Quest.Mdl,
    private readonly userService: UserService,
    private readonly pushService: PushService
  ) {
    super(QuestService.name, Quest);
  }
  async summarize(): Promise<gql.QuestSummary> {
    return {
      totalQuest: await this.Quest.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }

  // async reserveQuest(questId: Id, userId: Id) {
  //   // Logger.debug(",)
  //   Logger.debug(`service:reserveQuest model:QuestService input:{questId: ${questId} userId: ${userId}}`);
  //   const [quest, reserver] = await Promise.all([this.load(questId), this.userService.load(userId)]);
  //   if (!quest) throw new Error("Quest not found");
  //   if (!reserver) throw new Error("User not found");
  //   await quest.reserve(userId, reserver.gender).save();
  //   if (reserver.mobileToken)
  //     await this.pushService.sendNotification({
  //       to: reserver.mobileToken,
  //       title: quest.name,
  //       body: `${reserver.nickname}님, 예약이 승인되었습니다.`,
  //     });
  //   return quest;
  // }

  // async unReserveQuest(questId: Id, userId: Id, { account, address, ip }: LoadConfig<Quest.Doc> = {}) {
  //   Logger.debug(`service:unReserveQuest model:QuestService input:{questId: ${questId} userId: ${userId}}`);
  //   const [quest, reserver] = await Promise.all([this.load(questId), this.userService.load(userId)]);
  //   if (!quest) throw new Error("Quest not found");
  //   if (!reserver) throw new Error("User not found");
  //   await quest.unReserve(userId, reserver.gender).save();
  //   const employer = await this.userService.load(quest.employer);
  //   if (!employer) throw new Error("Employer not found");
  //   if (employer.mobileToken)
  //     await this.pushService.sendNotification({
  //       to: employer.mobileToken,
  //       title: quest.name,
  //       body: `${reserver.nickname}님이 예약을 취소하였습니다.`,
  //     });
  //   return quest;
  // }

  // async applyQuest(questId: Id, userId: Id) {
  //   Logger.debug(`service:applyQuest model:QuestService input:{questId: ${questId} userId: ${userId}}`);
  //   const [quest, applicant] = await Promise.all([this.load(questId), this.userService.load(userId)]);
  //   if (!quest) throw new Error("Quest not found");
  //   if (!applicant) throw new Error("User not found");
  //   await quest.apply(userId, applicant.gender).save();
  //   const employer = await this.userService.load(quest.employer);
  //   if (!employer) throw new Error("Employer not found");
  //   if (employer.mobileToken)
  //     await this.pushService.sendNotification({
  //       to: employer.mobileToken,
  //       title: quest.name,
  //       body: `${applicant.nickname}의 예약신청이 접수되었습니다.`,
  //     });
  //   return quest;
  // }
}
