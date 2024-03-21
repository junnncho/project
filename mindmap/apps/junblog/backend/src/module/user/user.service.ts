import * as User from './user.model';
import { DepositListService } from '../waiting/waiting.service';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SpecialReferralService } from '../specialReferral/specialReferral.service';
import { Utils } from '@nogql/util';
import { VideoViewService } from '../videoView/videoView.service';
import { Theme } from './user.model';

@Injectable()
export class UserService extends LoadService<User.Mdl, User.Doc> {
  constructor(
    @InjectModel(User.name)
    private readonly User: User.Mdl,
    private readonly depositListService: DepositListService,
    private readonly specialReferralService: SpecialReferralService,
    private readonly videoViewService: VideoViewService
  ) {
    super(UserService.name, User);
  }
  async generateWithKeyring(id: Id): Promise<User.Doc> {
    const user = await this.User.findById(id);
    if (!user) throw new Error('You are not registered!');
    return user;
  }
  async updateColor(id: Id, color: Theme): Promise<User.Doc> {
    const user = await this.User.findById(id);
    if (!user) throw new Error('You are not registered!');
    return await user
      .merge({
        color: color,
      })
      .save();
  }

  async getAllUsers(): Promise<any> {
    //user list 가져오기
    return { message: 'Welcome to gamble-bot!' };
  }
  async getUser(id: Id): Promise<User.Doc> {
    const user = await this.User.findOne({ keyring: id });
    if (!user) throw new Error('You are not registered!');
    return user;
  }

  async initialize(userId: Id, email: string, code?: string): Promise<User.Doc> {
    console.log('initialize');
    const user = await this.getUserById(userId);
    return await user
      .merge({
        email: email,
      })
      .save();
  }

  async getUserById(id: Id): Promise<User.Doc> {
    const user = await this.User.findById(id);
    if (!user) throw new Error('You are not registered!');
    return user;
  }

  async banUser(userId: Id): Promise<void> {
    const user = await this.getUserById(userId);
    await user.banUser().save();
  }

  // async registerAmount(tid: number, amount: number): Promise<void> {
  //   await this.User.updateOne({ telegramId: tid }, { bettingAmount: amount });
  // }
}
