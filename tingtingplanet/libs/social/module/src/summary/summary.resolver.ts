import { Resolver } from "@nestjs/graphql";
import { SummaryService } from "./summary.service";

import * as gql from "../gql";

@Resolver(() => gql.shared.Summary)
export class SummaryResolver {
  constructor(private readonly summaryService: SummaryService) {}
}
