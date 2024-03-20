import * as QuestVerify from "./questVerify.model";
import * as gql from "../gql";
import { Id, LoadService, LoadConfig, AddrLoadService } from "@shared/util-server";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PushService } from "../push/push.service";

@Injectable()
export class QuestVerifyService extends LoadService<QuestVerify.Mdl, QuestVerify.Doc, QuestVerify.Input> {
  constructor(
    @InjectModel(QuestVerify.name)
    private readonly QuestVerify: QuestVerify.Mdl,
    private readonly userService: UserService,
    private readonly pushService: PushService
  ) {
    super(QuestVerifyService.name, QuestVerify);
  }
  async summarize(): Promise<gql.QuestVerifySummary> {
    return {
      totalQuestVerify: await this.QuestVerify.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }

  // async applyQuestVerify(questVerifyId: Id, userId: Id) {
  //   Logger.debug(
  //     `service:applyQuestVerify model:QuestVerifyService input:{questVerifyId: ${questVerifyId} userId: ${userId}}`
  //   );
  //   const [questVerify, applicant] = await Promise.all([this.load(questVerifyId), this.userService.load(userId)]);
  //   if (!questVerify) throw new Error("QuestVerify not found");
  //   if (!applicant) throw new Error("User not found");
  //   await questVerify.apply(userId, applicant.gender).save();
  //   const employer = await this.userService.load(questVerify.employer);
  //   if (!employer) throw new Error("Employer not found");
  //   if (employer.mobileToken)
  //     await this.pushService.sendNotification({
  //       to: employer.mobileToken,
  //       title: questVerify.name,
  //       body: `${applicant.nickname}의 예약신청이 접수되었습니다.`,
  //     });
  //   return questVerify;
  // }
}
