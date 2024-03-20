import { readFileSync } from "fs";
import type { Config } from "@jest/types";
const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(`${__dirname}/.lib.swcrc`, "utf-8"));
const config: Config.InitialOptions = {
  displayName: "shared/test-server",
  preset: "../../../jest.preset.js",
  transform: {
    "^.+\\.[tj]s$": ["@swc/jest", swcJestConfig],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/libs/shared/test-server",
};

export default config;
