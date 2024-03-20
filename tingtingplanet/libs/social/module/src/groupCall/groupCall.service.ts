import * as GroupCall from "./groupCall.model";
import * as gql from "../gql";
import * as srv from "../srv";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadConfig, LoadService } from "@shared/util-server";

@Injectable()
export class GroupCallService extends LoadService<GroupCall.Mdl, GroupCall.Doc, GroupCall.Input> {
  constructor(
    @InjectModel(GroupCall.name)
    private readonly GroupCall: GroupCall.Mdl,
    private readonly userService: srv.UserService
  ) {
    super(GroupCallService.name, GroupCall);
  }

  override async create(data: gql.GroupCallInput, { account }: LoadConfig<GroupCall.Doc> = {}) {
    // if(!account) throw new Error("No Account");
    const user = account ? await this.userService.pick({ keyring: account.keyring }) : null;
    const groupCall =
      (await this.GroupCall.findOne({ roomId: data.roomId })) ?? (await new this.GroupCall({ ...data }).save());
    return user ? await groupCall.addUser(user._id) : groupCall;
  }
  async joinGroupCall(callId: string, userId: string) {
    const user = await this.userService.pick({ id: userId });
    const groupCall = await this.pick({ _id: callId });

    return await groupCall.addUser(user._id);
  }
  async leaveGroupCall(callId: string, userId: string) {
    const user = await this.userService.pick({ id: userId });
    const groupCall = await this.pick({ _id: callId });
    return groupCall.merge({ users: groupCall.users.filter((u) => u === user.id) }).save();
  }
  async summarize(): Promise<gql.GroupCallSummary> {
    return {
      totalGroupCall: await this.GroupCall.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
