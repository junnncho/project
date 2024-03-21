import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import * as model from '../model';
import { Inject, Injectable } from '@nestjs/common';
import { LogService, verifyToken } from '@nogql/util-server';
import { SecurityOptions } from '../option';

@Injectable()
export class SecurityService extends LogService {
  constructor(@Inject('SECURITY_OPTIONS') private options: SecurityOptions) {
    super(SecurityService.name);
  }
  decrypt(hash: string) {
    return crypto.AES.decrypt(hash, this.options.aeskey).toString(crypto.enc.Utf8);
  }
  encrypt(data: string) {
    return crypto.AES.encrypt(data, this.options.aeskey).toString();
  }
  generateToken(keyring: model.Keyring.Doc, user: model.User.Doc): model.AccessToken {
    return {
      jwt: jwt.sign(
        {
          keyring: keyring._id,
          role: 'user',
          roles: user.roles,
          status: keyring.status,
          _id: user._id,
        },
        this.options.jwtSecret
      ),
    };
  }
  verifyToken(token?: string) {
    return verifyToken(this.options.jwtSecret, token);
  }
}
