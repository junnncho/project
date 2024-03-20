import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const serviceDeskInput = (): gql.ServiceDeskInput => ({} as any);

export const createServiceDesk = async (app: TestingModule) => {
  const serviceDeskService = app.get<srv.ServiceDeskService>(srv.ServiceDeskService);
  const serviceDesk = await serviceDeskService.create(serviceDeskInput());
  return serviceDesk;
};
