import { Tree, readProjectConfiguration } from "@nrwl/devkit";
import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";

import { PluginGeneratorSchema } from "./schema";
import generator from "./generator";

describe("plugin generator", () => {
  let appTree: Tree;
  const options: PluginGeneratorSchema = { name: "test" };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, "test");
    expect(config).toBeDefined();
  });
});
