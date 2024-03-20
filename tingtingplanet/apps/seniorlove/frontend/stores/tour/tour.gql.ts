import { BaseGql, Field, InputType, Int, ObjectType, PickType, createGraphQL, mutate, ID } from "@shared/util-client";
import { LightUser, User } from "../user/user.gql";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";
import { gql as social } from "@social/data-access";
import dayjs, { Dayjs } from "dayjs";
import graphql from "graphql-tag";
import { ChatBoard, LightChatBoard } from "libs/social/data-access/src/gql";

@InputType("TourInput")
export class TourInput {
  @Field(() => String)
  name: string;

  @Field(() => ID, { nullable: true })
  chatBoard?: string | null;

  @Field(() => User)
  driver: User | LightUser;

  @Field(() => Date, { default: dayjs().set("hour", 7) })
  departAt: Dayjs;

  @Field(() => String)
  phone: string;

  @Field(() => Int)
  dues: number;

  @Field(() => String)
  place: string;

  @Field(() => [[String, String]], { default: [["", ""]] })
  departPlace: [string, string][];

  @Field(() => [shared.File], { nullable: true })
  thumbnails: shared.File[] | null;

  @Field(() => String)
  content: string;

  @Field(() => Boolean, { default: true })
  distinctGender: boolean;

  @Field(() => [shared.File])
  contentFiles: shared.File[];

  @Field(() => Int, { default: 0 })
  maxMaleReserver: number;

  @Field(() => Int, { default: 0 })
  maxFemaleReserver: number;
}

@ObjectType("Tour", { _id: "id" })
export class Tour extends BaseGql(TourInput) {
  @Field(() => String)
  status: cnst.TourStatus;

  @Field(() => Int, { default: 0 })
  totalFemaleReserver: number;

  @Field(() => Int, { default: 0 })
  totalMaleReserver: number;

  @Field(() => Int, { default: 0 })
  totalFemaleApplicant: number;

  @Field(() => Int, { default: 0 })
  totalMaleApplicant: number;

  @Field(() => [User])
  femaleReservers: User[] | LightUser[];

  @Field(() => [User])
  maleReservers: User[] | LightUser[];

  @Field(() => [User])
  femaleApplicants: User[] | LightUser[];

  @Field(() => [User])
  maleApplicants: User[] | LightUser[];
}

@ObjectType("LightTour", { _id: "id", gqlRef: "Tour" })
export class LightTour extends PickType(Tour, [
  "status",
  "name",
  "departAt",
  "dues",
  "chatBoard",
  "place",
  "departPlace",
  "maxFemaleReserver",
  "maxMaleReserver",
  "totalFemaleReserver",
  "phone",
  "totalMaleReserver",
  "chatBoard",
  "thumbnails",
] as const) {}

@ObjectType("TourSummary")
export class TourSummary {
  @Field(() => Int)
  totalTour: number;
}

export const tourQueryMap: { [key in keyof TourSummary]: any } = {
  totalTour: { status: { $ne: "inactive" } },
};

export const tourGraphQL = createGraphQL("tour" as const, Tour, TourInput, LightTour);
export const {
  getTour,
  listTour,
  tourCount,
  tourExists,
  createTour,
  updateTour,
  removeTour,
  lightTourFragment,
  tourFragment,
  purifyTour,
  crystalizeTour,
  lightCrystalizeTour,
  defaultTour,
  addTourFiles,
} = tourGraphQL;
// * Apply Tour Mutation
export type ApplyTourMutation = { applyTour: Tour };
export const applyTourMutation = graphql`
  ${tourFragment}
  mutation applyTour($tourId: ID!) {
    applyTour(tourId: $tourId) {
      ...tourFragment
    }
  }
`;
export const applyTour = async (tourId: string) =>
  crystalizeTour((await mutate<ApplyTourMutation>(applyTourMutation, { tourId })).applyTour);

export type ReserveTourMutation = { reserveTour: Tour };
export const reserveTourMutation = graphql`
  ${tourFragment}
  mutation reserveTour($tourId: ID!, $userId: ID!) {
    reserveTour(tourId: $tourId, userId: $userId) {
      ...tourFragment
    }
  }
`;
export const reserveTour = async (tourId: string, userId: string) =>
  crystalizeTour((await mutate<ReserveTourMutation>(reserveTourMutation, { tourId, userId })).reserveTour);

export type UnReserveTourMutation = { unReserveTour: Tour };
export const unReserveTourMutation = graphql`
  ${tourFragment}
  mutation unReserveTour($tourId: ID!, $userId: ID!) {
    unReserveTour(tourId: $tourId, userId: $userId) {
      ...tourFragment
    }
  }
`;
export const unReserveTour = async (tourId: string, userId: string) =>
  crystalizeTour((await mutate<UnReserveTourMutation>(unReserveTourMutation, { tourId, userId })).unReserveTour);
