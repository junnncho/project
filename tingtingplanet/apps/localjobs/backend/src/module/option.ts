export { option as shared } from "@shared/module";
export { option as social } from "@social/module";
import { option as shared } from "@shared/module";
import { option as social } from "@social/module";
export type ModulesOptions = shared.ModulesOptions  & social.ModulesOptions & { expo: string };
