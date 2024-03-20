import { DiscordService } from "./discord.service";
import { TestSystem } from "@shared/test-server";
import { environment } from "../_environments/environment";
import { registerModules } from "../module";

describe("Discord Service", () => {
  const system = new TestSystem();
  let discordService: DiscordService;
  beforeAll(async () => {
    const app = await system.init(registerModules(environment));
    discordService = app.get<DiscordService>(DiscordService);
  });
  it("Post Webhook Message", () => {
    discordService.log("test");
  });
});
