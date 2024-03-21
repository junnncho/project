import { IsString } from 'class-validator';
import { User } from '@entity';
import { GetProfileAPI } from './user.type';
export class AuthCredentialsDto {
  @IsString()
  account: string;

  @IsString()
  signature: string;
}

export enum UserAdmin {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
}
export class SignInAPI {
  token: string;
  user: GetProfileAPI;
}
