import * as Chance from "chance";
import * as gql from "../gql";
import { KeyringService } from "./keyring.service";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const keyringInput = (): gql.KeyringInput => ({});
export const createKeyring = async (app: TestingModule) => {
  const keyringService = app.get<KeyringService>(KeyringService);
  const keyring = await keyringService.create(keyringInput());
  return keyring;
};
