import * as fs from 'fs';
import type { Config } from '@jest/types';
const swcrc = JSON.parse(fs.readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8').toString());
swcrc.jsc.minify = null;
const config: Config.InitialOptions = {
  displayName: 'nogql/ui-web',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', swcrc],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/nogql/ui-web',
};

export default config;