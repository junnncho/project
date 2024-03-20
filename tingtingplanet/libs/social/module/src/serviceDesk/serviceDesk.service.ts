import * as ServiceDesk from "./serviceDesk.model";
import * as gql from "../gql";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadService } from "@shared/util-server";

@Injectable()
export class ServiceDeskService extends LoadService<ServiceDesk.Mdl, ServiceDesk.Doc, ServiceDesk.Input> {
  constructor(
    @InjectModel(ServiceDesk.name)
    private readonly ServiceDesk: ServiceDesk.Mdl
  ) {
    super(ServiceDeskService.name, ServiceDesk);
  }
  async summarize(): Promise<gql.ServiceDeskSummary> {
    return {
      totalServiceDesk: await this.ServiceDesk.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
