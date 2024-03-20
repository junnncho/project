import { Int, Query, Resolver } from "@nestjs/graphql";
import { PubsubService } from "./pubsub.service";

@Resolver()
export class CommonResolver {
  constructor(private readonly PubsubService: PubsubService) {}
  @Query(() => Int)
  async ether() {
    return 1;
  }
}
