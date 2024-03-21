import { Account, Allow, RequiredAuth } from '@nogql/util-server';
import { Body, Controller, Get, Injectable, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ContractService } from '../contract/contract.service';
import { DepositListService, WithdrawListService } from '../waiting/waiting.service';
import { FileService, KeyringService } from '@nogql/module/srv';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Response } from 'express';
import { User } from '../model';
import { UserService } from './user.service';
import { VideoViewService } from '../videoView/videoView.service';

@Injectable()
@Controller('user')
export class UserController {
  constructor(
    private readonly keyringService: KeyringService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly depositService: DepositListService,
    private readonly withdrawService: WithdrawListService,
    private readonly contractService: ContractService,
    private readonly videoViewService: VideoViewService
  ) {}
  @Post('logout')
  @UseGuards(Allow.User)
  async logout(@RequiredAuth() account: Account, @Res() res: Response) {
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: true });
    return res.send();
  }

  @Get('whoami')
  @UseGuards(Allow.User)
  async whoAmI(@RequiredAuth() account: Account, @Query('activate') activate?: string, @Query('code') code?: string) {
    if (activate && activate === 'true') {
      const keyring = await this.keyringService.activateUser(account.keyring);
      keyring.accountId && (await this.userService.initialize(account._id, keyring.accountId));
    }
    const user = await this.userService.load(account._id);
    const url = user?.image && (await this.fileService.resolveUrl(user.image));
    const views = await this.videoViewService.getViews(account._id);
    const receipts = await this.depositService.getList(account._id);

    return { ...user?.toObject(), image: url, views, receipts };
  }
}
