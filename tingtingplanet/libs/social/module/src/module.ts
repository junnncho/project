import { ActionLogModule } from "./actionLog/actionLog.module";
import { BoardModule } from "./board/board.module";
import { ChatBoardModule } from "./chatBoard/chatBoard.module";
import { ChatRoomModule } from "./chatRoom/chatRoom.module";
import { CommentModule } from "./comment/comment.module";
import { DynamicModule } from "@nestjs/common";
import { EmojiModule } from "./emoji/emoji.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GroupCallModule } from "./groupCall/groupCall.module";
import { ModulesOptions } from "./option";
import { ReportModule } from "./report/report.module";
import { ScalarModule } from "./_scalar/scalar.module";
import { ServiceDeskModule } from "./serviceDesk/serviceDesk.module";
import { SocialBatchModule } from "./socialBatch/socialBatch.module";
import { StoryModule } from "./story/story.module";
import { SummaryModule } from "./summary/summary.module";
import { UserModule } from "./user/user.module";
import { module as shared } from "@shared/module";

export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    ...(!isChild ? shared.registerModules(options, true) : []),
    EventEmitterModule.forRoot(),
    ChatRoomModule,
    ChatBoardModule.register(options),
    ServiceDeskModule,
    EmojiModule,
    GroupCallModule,
    ScalarModule,
    ActionLogModule,
    BoardModule,
    ScalarModule,
    StoryModule,
    CommentModule,
    ReportModule,
    SummaryModule.register(!isChild),
    UserModule.register(!isChild),
  ] as DynamicModule[];
  return modules;
};
export const registerBatches = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    SocialBatchModule as unknown as DynamicModule,
    //
  ] as DynamicModule[];
  return modules;
};
