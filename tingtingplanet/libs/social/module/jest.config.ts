import { readFileSync } from "fs";
import type { Config } from "@jest/types";
const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(`${__dirname}/.lib.swcrc`, "utf-8"));
const config: Config.InitialOptions = {
  displayName: "social/module",
  preset: "../../../jest.preset.js",
  transform: {
    "^.+\\.[tj]s$": ["@swc/jest", swcJestConfig],
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../../coverage/libs/social/module",
};

export default config;
