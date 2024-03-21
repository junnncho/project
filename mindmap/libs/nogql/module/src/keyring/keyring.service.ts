import * as Keyring from './keyring.model';
import * as model from '../model';
import { Id, LoadService } from '@nogql/util-server';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService, MessageService, SecurityService } from '../srv';
import { SecurityOptions } from '../option';
import { UserService } from '../user/user.service';
import { Utils, cnst } from '@nogql/util';

@Injectable()
export class KeyringService extends LoadService<Keyring.Mdl, Keyring.Doc> {
  constructor(
    @Inject('SECURITY_OPTIONS') private readonly options: SecurityOptions,
    @InjectModel(Keyring.name)
    private readonly Keyring: model.Keyring.Mdl,
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
    private readonly mailerService: MailerService,
    private readonly messageService: MessageService
  ) {
    super(KeyringService.name, Keyring);
  }
  async whoAmI(keyringId: Id, data: Partial<model.User.Doc> = {}) {
    this.logger.debug(`service::keyringService model:whoAmI input: {keyringId: ${keyringId?.toString()}} `);
    const lastLoginAt = new Date();
    const keyring = await this.Keyring.pickById(keyringId);
    const user = await this.userService.generateWithKeyring(keyringId, data);
    if (!keyring.isFor(user._id)) await keyring.merge({ user: user._id });
    await keyring.merge({ lastLoginAt }).save();
    return await user.merge({ lastLoginAt }).save();
  }

  async generateToken(keyring: Keyring.Doc, data?: Partial<model.User.Doc>) {
    const user = await this.whoAmI(keyring._id, data);
    return this.securityService.generateToken(keyring, user);
  }

  //*===================================================================*//
  //*====================== Password Signing Area ======================*//
  async getKeyringIdHasAccountId(accountId: string) {
    return (await this.Keyring.findOne({ accountId, status: 'active' }))?._id;
  }
  async signupPassword(accountId: string, password: string, keyringId: Id | null): Promise<Keyring.Doc> {
    this.logger.debug(
      `service: keyringService model: signupPassword input: {keyring:${keyringId?.toString()}, user:${accountId}} `
    );
    const keyring = await this.Keyring.generateWithAccountId(accountId, password, keyringId);
    await this.Keyring.extinctAccountId(accountId, keyring._id);
    return keyring;
  }

  async signupPassword2(phone: string, password: string, keyringId: Id | null): Promise<Keyring.Doc> {
    this.logger.debug(
      `service:keyringService model:signupPassword2 input: {keyring:${keyringId?.toString()}, phone:${phone}} `
    );
    const keyring = await this.Keyring.generateWithPasswordPhone(phone, password, keyringId);
    return keyring;
  }
  async signinPassword(accountId: string, password: string): Promise<model.AccessToken> {
    const keyring = await this.Keyring.getAuthorizedKeyring(accountId, password);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    return await this.generateToken(keyring);
  }

  async signinPassword2(phone: string, password: string): Promise<model.AccessToken> {
    this.logger.debug(`service:keyringService model: signinPassword2 input: {phone:${phone}} `);
    const keyring = await this.Keyring.getAuthorizedKeyring2(phone, password);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    return await this.generateToken(keyring);
  }
  async signaddPassword(accountId: string, password, keyringId: Id) {
    const keyring = await this.Keyring.pickById(keyringId);
    if (keyring.verifies.includes('password')) throw new Error('Already has password');
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    await this.Keyring.extinctAccountId(accountId, keyring._id);
    return await keyring.applyIdPassword(accountId, password).save();
  }
  async changePassword(password: string, prevPassword: string, keyringId: Id) {
    const prevKeyring = await this.Keyring.pickById(keyringId);
    const keyring = await this.Keyring.getAuthorizedKeyring(prevKeyring.accountId as string, prevPassword);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    return await keyring.merge({ password }).save();
  }
  async changePasswordWithPhone(password: string, phone: string, phoneCode: string, keyringId: Id) {
    const keyring = await this.Keyring.pickById(keyringId);
    if (!keyring.verifies.includes('phone')) throw new Error('Unable to change password with phone');
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    await keyring.consumePhoneVerification(phone, phoneCode).save();
    return await keyring.merge({ password }).save();
  }
  async resetPassword(accountId: string): Promise<boolean> {
    const keyring = await this.Keyring.pickOne({
      accountId,
      status: { $ne: 'inactive' },
    });
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    if (keyring.updatedAt.getTime() > Utils.getLastMinutes(3).getTime()) throw new Error(`Retry after 3 minutes`);
    const password = Utils.randomString();
    await keyring.merge({ password }).save();
    return this.mailerService.sendPasswordResetMail(accountId, password);
  }
  //*====================== Password Signing Area ======================*//
  //*===================================================================*//

  //*================================================================*//
  //*====================== Phone Signing Area ======================*//
  async getKeyringIdHasPhone(phone: string) {
    return (await this.Keyring.findOne({ phone, status: 'active' }))?._id;
  }
  async addPhoneInPrepareKeyring(phone: string, keyringId: Id | null): Promise<Keyring.Doc> {
    if (await this.Keyring.exists({ phone, status: 'active' })) throw new Error('Already used phone number');
    const keyring = await this.Keyring.generateWithPhone(phone, keyringId);
    return keyring;
  }
  async addPhoneInActiveKeyring(phone: string, keyringId: Id): Promise<Keyring.Doc> {
    if (
      await this.Keyring.exists({
        phone,
        status: 'active',
        _id: { $ne: keyringId },
        verifies: 'phone',
      })
    )
      throw new Error('Already used phone number');
    return await this.Keyring.pickAndWrite(keyringId, { phone });
  }
  async requestPhoneCode(keyringId: Id, phone: string, hash: string) {
    const keyring = await this.Keyring.pickById(keyringId);
    await keyring.applyPhoneCode(phone, Utils.randomCode(6)).save();
    await this.messageService.sendPhoneCode(keyring.phone as string, keyring.phoneCode as string, hash);
    return keyring.getPhoneCodeAt();
  }
  async verifyPhoneCode(keyringId: Id, phone: string, phoneCode: string) {
    const keyring = await this.Keyring.pickById(keyringId);
    return await keyring.applyPhoneVerification(phone, phoneCode).save();
  }
  async signupPhone(keyringId: Id, phone: string, phoneCode: string): Promise<Keyring.Doc> {
    const keyring = await this.Keyring.pickById(keyringId);
    if (keyring.status !== 'prepare') throw new Error('Already Activated Keyring');
    await keyring.consumePhoneVerification(phone, phoneCode).save();
    await this.Keyring.extinctPhone(phone, keyring._id);
    return keyring;
  }
  async signinPhone(keyringId: Id, phone: string, phoneCode: string) {
    const keyring = await this.Keyring.pickById(keyringId);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    await keyring.consumePhoneVerification(phone, phoneCode).save();
    return this.generateToken(keyring);
  }
  async signaddPhone(keyringId: Id, phone: string, phoneCode: string) {
    const keyring = await this.Keyring.pickById(keyringId);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    await keyring.consumePhoneVerification(phone, phoneCode).save();
    await this.Keyring.extinctPhone(phone, keyring._id);
    return keyring;
  }
  //*====================== Phone Signing Area ======================*//
  //*================================================================*//
  override async remove(keyringId: Id): Promise<Keyring.Doc> {
    const keyring = await this.Keyring.pickById(keyringId);
    return await keyring.reset().merge({ status: 'inactive' }).save();
  }
  // async summarize(): Promise<gql.KeyringSummary> {
  //   return {
  //     totalKeyring: await this.Keyring.countDocuments({
  //       status: { $ne: 'inactive' },
  //     }),
  //   };
  // }

  //*====================== SSO Signing Area ======================*//
  //*================================================================*//
  async signupSso(accountId: string, ssoType: cnst.SsoType, keyringId?: Id) {
    const keyring = await this.Keyring.generateWithSSO(accountId, ssoType, keyringId);
    await this.Keyring.extinctAccountId(accountId, keyring._id);
    return keyring;
  }
  async signinSso(accountId: string, ssoType: cnst.SsoType): Promise<model.AccessToken> {
    const keyring = await this.Keyring.getKeyringWithSSO(accountId, ssoType);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    return this.generateToken(keyring);
  }
  async signaddSso(keyringId: Id, accountId: string, ssoType: cnst.SsoType): Promise<Keyring.Doc> {
    const keyring = await this.Keyring.pickById(keyringId);
    if (keyring.verifies.includes(ssoType)) throw new Error(`Already has ${ssoType} SSO`);
    if (keyring.status !== 'active') throw new Error('Not activated yet');
    await keyring.applyIdWithSSO(accountId, ssoType).save();
    await this.Keyring.extinctAccountId(accountId, keyring._id);
    return keyring;
  }

  async activateUser(keyringId: Id) {
    const keyring = await this.Keyring.pickById(keyringId);
    if (keyring.status === 'active') throw new Error('Already activated');
    // TODO: check minimum verification levels
    return await keyring.merge({ status: 'active' }).save();
  }

  async relateUser(keyringId: Id, userId: Id) {
    this.logger.debug(`service::keyringService model:relateUser input: {keyringId: ${keyringId?.toString()}} `);
    const lastLoginAt = new Date();
    const keyring = await this.Keyring.pickById(keyringId);
    if (!keyring.isFor(userId)) await keyring.merge({ user: userId });
    await keyring.merge({ lastLoginAt }).save();
  }
}
