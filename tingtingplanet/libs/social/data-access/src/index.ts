import { Store } from "@shared/util-client";
import type { RootState } from "./store";
export * as store from "./store";
export * as gql from "./gql";
export * as slice from "./slice";
export * from "./locale";
export const st = {} as Store<RootState>;
