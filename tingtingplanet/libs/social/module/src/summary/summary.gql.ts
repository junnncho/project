import { ActionLogSummary } from "../actionLog/actionLog.gql";
import { BoardSummary } from "../board/board.gql";
import { ChatRoomSummary } from "../chatRoom/chatRoom.gql";
import { CommentSummary } from "../comment/comment.gql";
import { EmojiSummary } from "../emoji/emoji.gql";
import { GroupCallSummary } from "../groupCall/groupCall.gql";
import { InputType, IntersectionType, ObjectType } from "@nestjs/graphql";
import { ReportSummary } from "../report/report.gql";
import { Schema } from "@nestjs/mongoose";
import { ServiceDeskSummary } from "../serviceDesk/serviceDesk.gql";
import { SocialUserSummary } from "../user/user.gql";
import { StorySummary } from "../story/story.gql";
import { mixInputType, mixObjectType } from "@shared/util-server";
import { gql as shared } from "@shared/module";

// * 1. 보안필드를 제외한 모든 필드
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Base {}

// * 2. 다른 필드를 참조하는 값 Input형식으로 덮어씌우기
@InputType({ isAbstract: true })
class InputOverwrite {}

// * 3. 보안필드, default 필드 생성 필수
@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
@Schema()
class Tail extends Base {}

interface Base
  extends ActionLogSummary,
    BoardSummary,
    CommentSummary,
    StorySummary,
    //
    SocialUserSummary,
    ReportSummary,
    ChatRoomSummary,
    ServiceDeskSummary,
    EmojiSummary,
    GroupCallSummary {
  // ChatBoardSummary
}
export const childSummaries = [
  // ChatBoardSummary,
  GroupCallSummary,
  EmojiSummary,
  ServiceDeskSummary,
  ChatRoomSummary,
  ActionLogSummary,
  BoardSummary,
  CommentSummary,
  StorySummary,
  SocialUserSummary,
  ReportSummary,
  //
];
childSummaries.map((model) => mixObjectType(Base, model));

export type SocialSummaryInput = Base;
export type SocialSummary = Tail & Base;

// * 최종 생성 모델
export class SummaryInput {}
export interface SummaryInput extends shared.SummaryInput, InputOverwrite, Base {}
mixInputType(shared.SummaryInput, IntersectionType(InputOverwrite, Base, InputType));

export class Summary {}
export interface Summary extends shared.Summary, Base, Tail {}
mixObjectType(shared.Summary, IntersectionType(Base, Tail));

@Schema()
export class SummarySchema extends Tail {}
