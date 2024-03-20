import {
  BaseGql,
  Field,
  InputType,
  Int,
  ObjectType,
  PickType,
  createGraphQL,
} from "@shared/util-client";
import { cnst } from "@shared/util";

@InputType("ServiceDeskInput")
export class ServiceDeskInput {
  @Field(() => String)
  field: string;
}

@ObjectType("ServiceDesk", { _id: "id" })
export class ServiceDesk extends BaseGql(ServiceDeskInput) {
  @Field(() => String)
  status: cnst.ServiceDeskStatus;
}

@ObjectType("LightServiceDesk", { _id: "id", gqlRef: "ServiceDesk" })
export class LightServiceDesk extends PickType(ServiceDesk, ["status"] as const) {}

@ObjectType("ServiceDeskSummary")
export class ServiceDeskSummary {
  @Field(() => Int)
  totalServiceDesk: number;
}

export const serviceDeskQueryMap: { [key in keyof ServiceDeskSummary]: any } = {
  totalServiceDesk: { status: { $ne: "inactive" } },
};

export const serviceDeskGraphQL = createGraphQL(
  "serviceDesk" as const,
  ServiceDesk,
  ServiceDeskInput,
  LightServiceDesk
);
export const {
  getServiceDesk,
  listServiceDesk,
  serviceDeskCount,
  serviceDeskExists,
  createServiceDesk,
  updateServiceDesk,
  removeServiceDesk,
  serviceDeskFragment,
  lightServiceDeskFragment,
  purifyServiceDesk,
  crystalizeServiceDesk,
  lightCrystalizeServiceDesk,
  defaultServiceDesk,
  mergeServiceDesk,
} = serviceDeskGraphQL;
