import * as appleSignin from 'apple-signin';
import { Account, Allow, Id, RequiredAuth } from '@nogql/util-server';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppleCredential, EnvironmentOptions, SSOType, SecurityOptions } from '../option';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Injectable,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { KeyringService } from './keyring.service';
import type { Request, Response } from 'express';
// import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from '../srv';
import { KakaoGuard, NaverGuard } from './keyring.authguard';
interface RequestUser extends Request {
  user: {
    name?: string;
    email: string;
    image?: string;
    ssoToken?: string;
  };
}
@Injectable()
@ApiTags('auth')
@Controller('auth')
export class KeyringController {
  url: string;
  constructor(
    @Inject('ENVIRONMENT_OPTIONS') private readonly options: EnvironmentOptions,
    @Inject('SECURITY_OPTIONS')
    private readonly securityOption: SecurityOptions,
    private readonly keyringService: KeyringService,
    private readonly fileService: FileService
  ) {
    this.url = options.serves.includes('localhost') ? 'http://localhost:4200' : `https://${this.options.serves[0]}`;
  }

  async authCallbackBase(@Req() req: RequestUser, @Res() res: Response, ssoType: SSOType) {
    const [keyring] = await this.keyringService.list({
      accountId: req.user.email,
      status: { $ne: 'inactive' },
    });
    if (!keyring || keyring?.status === 'prepare') {
      const file =
        req?.user?.image && req?.user?.name && (await this.fileService.addFileJustUrl(req.user.image, req.user.name));
      const signupKeyring = await this.keyringService.signupSso(req.user.email, ssoType, keyring?._id);
      const accessToken = await this.keyringService.generateToken(signupKeyring, {
        nickname: req.user.name,
        ...(file && { image: file._id }),
      });
      res.cookie('signupKeyring', signupKeyring, { httpOnly: true, sameSite: 'none', secure: true }); //추후에 true로 바꿔야함
      res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'none', secure: true }); //추후에 true로 바꿔야함
      res.redirect(`${this.url}/signup?ssoType=${ssoType}`);
    } else if (!keyring.verifies.includes(ssoType)) {
      const myKeyring = await this.keyringService.signaddSso(keyring.id, req.user.email, ssoType);
      const accessToken = await this.keyringService.generateToken(myKeyring);
      res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'none', secure: true }); //추후에 true로 바꿔야함
      res.redirect(`${this.url}`);
    } else {
      const accessToken = await this.keyringService.signinSso(req.user.email, ssoType);
      res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'none', secure: true }); //추후에 true로 바꿔야함
      res.redirect(`${this.url}`);
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async loginGithub() {
    return 'logging in with github...';
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallbackGithub(@Req() req) {
    console.log(req.user);
    return req.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle() {
    return 'logging in with google...';
  }
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async authCallbackGoogle(@Req() req: RequestUser, @Res() res: Response) {
    console.log('callback', req.user);
    await this.authCallbackBase(req, res, 'google');
    return req.user;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async loginFacebook() {
    return 'logging in with facebook...';
  }
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async authCallbackFacebook(@Req() req) {
    console.log(req.user);
    return req.user;
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async loginApple() {
    return 'logging in with Apple...';
  }
  @Post('apple/callback')
  async appleLogin(@Body() payload: any): Promise<any> {
    console.log('Received', payload);
    if (!payload.code) {
      throw new ForbiddenException();
    }
    return this.verifyAppleUser(payload);
  }

  async verifyAppleUser(payload: any) {
    const sso = this.securityOption.sso.apple as AppleCredential;
    const clientSecret = appleSignin.getClientSecret({
      clientID: sso.clientID,
      teamId: sso.teamID,
      keyIdentifier: sso.keyID,
      privateKeyPath: sso.keyFilePath,
    });
    const tokens = await appleSignin.getAuthorizationToken(payload.code, {
      clientID: sso.clientID,
      clientSecret: clientSecret,
      redirectUri: sso.callbackURL,
    });
    if (!tokens.id_token) {
      console.log('no token.id_token');
      throw new ForbiddenException();
    }
    console.log('tokens', tokens);
    const data = jwt.decode(tokens.id_token);
    console.log('decoded', data);
    return { tokens, data };
  }

  @Get('kakao')
  @UseGuards(KakaoGuard)
  @ApiOperation({
    summary: 'Redirect Kakao SSO Login Page',
    description: 'redirect to kakao login page',
  })
  async loginKakao() {
    return;
  }

  @Get('kakao/callback')
  @UseGuards(KakaoGuard)
  @ApiOperation({
    summary: 'Get Kakao Information From Secret Token',
    description: 'put JWT token in to cookie & redirect to main page',
  })
  async getTokenFromKakao(@Req() req: RequestUser, @Res() res: Response) {
    console.log('KAKAO');
    await this.authCallbackBase(req, res, 'kakao');
  }

  @Get('naver')
  @UseGuards(NaverGuard)
  @ApiOperation({
    summary: 'Redirect Naver SSO Login Page',
    description: 'redirect to Naver login page',
  })
  async loginNaver() {
    return;
  }

  @Get('naver/callback')
  @UseGuards(NaverGuard)
  @ApiOperation({
    summary: 'Get Naver Information From Secret Token',
    description: 'put JWT token in to cookie & redirect to main page',
  })
  async getTokenFromNaver(@Req() req: RequestUser, @Res() res: Response) {
    await this.authCallbackBase(req, res, 'naver');
  }
  @Get('whoami')
  @UseGuards(Allow.User)
  async whoAmI(@RequiredAuth() account: Account, @Query('activate') activate?: string) {
    console.log('!!', account, activate);
    if (activate && activate === 'true') await this.keyringService.activateUser(account.keyring);
    return await this.keyringService.whoAmI(new Id(account.keyring));
  }
}
