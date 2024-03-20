import { BatchModule } from "./batch/batch.module";
import { DynamicModule } from "@nestjs/common";
import { ModulesOptions } from "./option";
import { ScalarModule } from "./_scalar/scalar.module";
import { TourModule } from "./tour/tour.module";
import { UserModule } from "./user/user.module";
import { module as shared } from "@shared/module";
import { module as social } from "@social/module";
import { PushModule } from "./push/push.module";

export const registerModules = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    ...shared.registerModules(options, true),
    ...social.registerModules(options, true),
    TourModule,
    UserModule.register(),
    PushModule.register(options),
    // ScalarModule,
  ].filter((module) => !!module) as DynamicModule[];
  return modules;
};
export const registerBatches = (options: ModulesOptions, isChild?: boolean) => {
  const modules = [
    ...shared.registerBatches(options, true),
    ...social.registerBatches(options, true),
    BatchModule,
  ].filter((module) => !!module) as DynamicModule[];
  return modules;
};
