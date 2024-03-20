import { TestSystem } from "@shared/test-server";
import { TourService } from "./tour.service";

import * as db from "../db";
import * as gql from "../gql";
import * as sample from "../sample";
import { registerModules } from "../module";
describe("Tour Service", () => {
  const system = new TestSystem();
  let tourService: TourService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    tourService = app.get<TourService>(TourService);
  });
  afterAll(async () => await system.terminate());
  let tour: db.Tour.Doc;

  let input: gql.TourInput;
  it("Create Tour", async () => {
    input = sample.tourInput();
    tour = await tourService.create(input);
    expect(tour.status).toEqual("active");
  });
  it("Update Tour", async () => {
    input = sample.tourInput();
    tour = await tourService.update(tour._id, input);
  });
  it("Remove Tour", async () => {
    tour = await tourService.remove(tour._id);
    expect(tour.status).toEqual("inactive");
  });
});
