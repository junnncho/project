import { Tree, readProjectConfiguration } from "@nrwl/devkit";
import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";

import { FieldGeneratorSchema } from "./schema";
import generator from "./generator";

describe("field generator", () => {
  let appTree: Tree;
  const options: FieldGeneratorSchema = { name: "test" };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it("should run successfully", async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, "test");
    expect(config).toBeDefined();
  });
});
