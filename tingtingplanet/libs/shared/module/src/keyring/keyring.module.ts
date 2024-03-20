import * as Keyring from "./keyring.model";
import {
  AppleOauthStrategy,
  FacebookOauthStrategy,
  GithubOauthStrategy,
  GoogleOauthStrategy,
  KakaoOauthStrategy,
  NaverOauthStrategy,
} from "./keyring.authguard";
import { DynamicModule, Global, Module } from "@nestjs/common";
import { KeyringController } from "./keyring.controller";
import { KeyringResolver } from "./keyring.resolver";
import { KeyringService } from "./keyring.service";
import { MongooseModule } from "@nestjs/mongoose";
import { option } from "@shared/module";

@Global()
@Module({})
export class KeyringModule {
  static register(securityOption: option.SecurityOptions, envOption: option.EnvironmentOptions): DynamicModule {
    return {
      module: KeyringModule,
      imports: [
        MongooseModule.forFeatureAsync([
          {
            name: Keyring.name,
            useFactory: Keyring.middleware(securityOption),
          },
        ]),
      ],
      controllers: [KeyringController],
      providers: [
        { provide: "SECURITY_OPTIONS", useValue: securityOption },
        { provide: "ENVIRONMENT_OPTIONS", useValue: envOption },
        { provide: "GITHUB_CREDENTIAL", useValue: securityOption.sso.github },
        {
          provide: "FACEBOOK_CREDENTIAL",
          useValue: securityOption.sso.facebook,
        },
        { provide: "KAKAO_CREDENTIAL", useValue: securityOption.sso.kakao },
        { provide: "NAVER_CREDENTIAL", useValue: securityOption.sso.naver },
        { provide: "GOOGLE_CREDENTIAL", useValue: securityOption.sso.google },
        { provide: "APPLE_CREDENTIAL", useValue: securityOption.sso.apple },
        KeyringService,
        KeyringResolver,
        ...(securityOption.sso.naver ? [NaverOauthStrategy] : []),
        ...(securityOption.sso.kakao ? [KakaoOauthStrategy] : []),
        ...(securityOption.sso.github ? [GithubOauthStrategy] : []),
        ...(securityOption.sso.google ? [GoogleOauthStrategy] : []),
        ...(securityOption.sso.facebook ? [FacebookOauthStrategy] : []),
        ...(securityOption.sso.apple ? [AppleOauthStrategy] : []),
      ],
      exports: [KeyringService],
    };
  }
}
