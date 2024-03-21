import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, SignInAPI } from '@type';
import { AccountValidationPipe } from 'src/pipe/accountValidation';
import { GetUser } from '@custom/index';
import { User } from '@entity';
import { GetProfileAPI } from '@type';
import { ProfileConvert } from '@func';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  async authCheck(@GetUser() user: User): Promise<GetProfileAPI> {
    console.log(user);
    const result = await this.authService.getProfile(user);
    console.log(result);
    return ProfileConvert(result, 1);
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe, AccountValidationPipe)
    authcredentialsDto: AuthCredentialsDto,
  ): Promise<SignInAPI> {
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe)
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignInAPI> {
    return this.authService.signIn(authCredentialsDto);
  }
}
