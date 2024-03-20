import * as gql from "../gql";
import * as srv from "../srv";
import { ActionLogService } from "./actionLog.service";
import { Allow, BaseResolver } from "@shared/util-server";
import { Resolver } from "@nestjs/graphql";

@Resolver(() => gql.ActionLog)
export class ActionLogResolver extends BaseResolver(
  gql.ActionLog,
  gql.ActionLogInput,
  Allow.Every,
  Allow.Every,
  Allow.Every
) {
  constructor(
    private readonly actionLogService: ActionLogService,
    private readonly fileService: srv.shared.FileService
  ) {
    super(actionLogService);
  }
}
