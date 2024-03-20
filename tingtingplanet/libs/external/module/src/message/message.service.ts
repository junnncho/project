import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "@shared/util-server";
import dayjs = require("dayjs");
import { MessageOptions } from "../option";
import { SolapiMessageService } from "solapi";

const messageTemplate = {
  type: "SMS", // 문자 타입 (SMS, LMS, MMS, CTA, ATA)
  //   to: "01074453714", // 문자를 받을 수신번호
  from: "025085225", // https://solapi.com/senderids 에서 등록한 발신번호
  //   text: "테스트문자입니다.",
};

@Injectable()
export class MessageService extends LogService {
  constructor(
    @Inject("MESSAGE_OPTIONS") private options: MessageOptions,
    @Inject("MESSAGE") private message: SolapiMessageService
  ) {
    super(MessageService.name);
  }
  async send(to: string, text: string, at = new Date()) {
    const res = await this.message.sendOneFuture(
      { from: this.options.phone, to: to.replace(/-/g, ""), text },
      dayjs(at).format("YYYY-MM-DD HH:mm:ss")
    );
    return true;
  }
  async sendPhoneCode(to: string, phoneCode: string, hash: string) {
    return await this.send(to, `[휴대폰 인증]: 인증번호 ${phoneCode} 를 입력하세요.\n${hash}`);
  }
}
