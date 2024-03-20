import * as Chance from "chance";
import * as gql from "../gql";
import * as srv from "../srv";
import { TestingModule } from "@nestjs/testing";
const c = new Chance();
export const tourInput = (): gql.TourInput => ({} as any);

export const createTour = async (app: TestingModule) => {
  const tourService = app.get<srv.TourService>(srv.TourService);
  const tour = await tourService.create(tourInput());
  return tour;
};
