import { ServiceDeskService } from "./serviceDesk.service";
import { TestSystem } from "@shared/test-server";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("ServiceDesk Service", () => {
  const system = new TestSystem();
  let serviceDeskService: ServiceDeskService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    serviceDeskService = app.get<ServiceDeskService>(ServiceDeskService);
  });
  afterAll(async () => await system.terminate());
  let serviceDesk: db.ServiceDesk.Doc;

  let input: gql.ServiceDeskInput;
  it("Create ServiceDesk", async () => {
    input = sample.serviceDeskInput();
    serviceDesk = await serviceDeskService.create(input);
    expect(serviceDesk.status).toEqual("active");
  });
  it("Update ServiceDesk", async () => {
    input = sample.serviceDeskInput();
    serviceDesk = await serviceDeskService.update(serviceDesk._id, input);
  });
  it("Remove ServiceDesk", async () => {
    serviceDesk = await serviceDeskService.remove(serviceDesk._id);
    expect(serviceDesk.status).toEqual("inactive");
  });
});
