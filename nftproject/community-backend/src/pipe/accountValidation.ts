import { UnauthorizedException, PipeTransform } from '@nestjs/common';
import { AuthCredentialsDto } from '@type';
import { keccak256, verifyMessage, toUtf8Bytes } from 'ethers/lib/utils';

import Web3 from 'web3';
export class AccountValidationPipe implements PipeTransform {
  constructor() {}
  async transform(value: AuthCredentialsDto) {
    const { account, signature } = value;
    const account_result = verifyMessage('hashmoss', signature).toLowerCase();
    if (account_result != account) {
      throw new UnauthorizedException('login failed');
    }

    return value;
  }
}
