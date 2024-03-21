import { Inject, Injectable } from '@nestjs/common';
import { Utils } from '@shared/util';
import { LogService } from '@shared/util-server';
import * as web3 from '@solana/web3.js';
import { SolanaOptions } from '../option';

@Injectable()
export class ContractService extends LogService {
  private readonly connection: web3.Connection;
  private readonly mainKey: web3.Keypair;
  constructor(
    @Inject('SOLANA_OPTIONS') private readonly options: SolanaOptions
  ) {
    super(ContractService.name);
    this.connection = new web3.Connection(options.connection);
    this.mainKey = Utils.string2Key(options.mainPrivateKey);
  }

  async addWithdraw(
    wallet: string,
    amount: number,
    transaction: web3.Transaction
  ): Promise<web3.Transaction> {
    transaction.add(
      web3.SystemProgram.transfer({
        fromPubkey: this.mainKey.publicKey,
        toPubkey: new web3.PublicKey(wallet),
        lamports: Utils.sol2Lam(amount),
      })
    );
    return transaction;
  }

  async withdraw(transaction: web3.Transaction): Promise<void> {
    transaction.feePayer = this.mainKey.publicKey;
    await web3.sendAndConfirmTransaction(this.connection, transaction, [
      this.mainKey,
    ]);
  }

  async deposit(userPrivate: string): Promise<number> {
    const userKey = Utils.string2Key(userPrivate);
    const balance = await this.connection.getBalance(userKey.publicKey);
    if (balance > 0) {
      this.logger.log(`user deposit:${Utils.lam2Sol(balance)}SOL`);
      const transaction = new web3.Transaction();
      transaction.add(
        web3.SystemProgram.transfer({
          fromPubkey: userKey.publicKey,
          toPubkey: this.mainKey.publicKey,
          lamports: balance,
        })
      );
      transaction.feePayer = this.mainKey.publicKey;
      try {
        await web3.sendAndConfirmTransaction(this.connection, transaction, [
          userKey,
          this.mainKey,
        ]);
      } catch (e) {
        this.logger.error(`user deposit error: ${e.message}`);
        return 0;
      }
    }
    return Utils.lam2Sol(balance);
  }

  async getMainWallet(): Promise<any> {
    const balance = await this.connection.getBalance(this.mainKey.publicKey);
    const address = this.mainKey.publicKey.toBase58();
    return { balance: Utils.lam2Sol(balance), address };
  }
}
