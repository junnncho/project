import * as gql from "../gql";
import * as srv from "../srv";
import { Allow, BaseResolver } from "@shared/util-server";
import { Resolver } from "@nestjs/graphql";
import { ServiceDeskService } from "./serviceDesk.service";

@Resolver(() => gql.ServiceDesk)
export class ServiceDeskResolver extends BaseResolver(
  gql.ServiceDesk,
  gql.ServiceDeskInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(
    private readonly serviceDeskService: ServiceDeskService,
    private readonly fileService: srv.shared.FileService
  ) {
    super(serviceDeskService);
  }
}
