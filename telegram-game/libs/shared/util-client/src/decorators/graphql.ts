import { Utils } from "@shared/util";
import { makeDefault } from "./defaultValue";
import { extractDependentFragments } from "./fragment";
import { makeCrystalize, makePurify } from "./purify";
import { makeDefaultQMs } from "./queryMutation";
import { CrystalizeFunc, DefaultGqls, DefaultOf, getClassMeta, InputOf, PurifyFunc, Type } from "./scalar";

type DefaultValueObj<T extends string, M> = {
  [K in `default${Capitalize<T>}`]: DefaultOf<M>;
};
type PurifyFuncObj<T extends string, I> = {
  [K in `purify${Capitalize<T>}`]: PurifyFunc<I>;
};
type CrystalizeFuncObj<T extends string, M, L> = {
  [K in `crystalize${Capitalize<T>}`]: CrystalizeFunc<M>;
} & {
  [K in `lightCrystalize${Capitalize<T>}`]: CrystalizeFunc<L>;
};
type FragmentObj<T extends string> = {
  [K in `${Uncapitalize<T>}Fragment`]: string;
} & {
  [K in `light${Capitalize<T>}Fragment`]: string;
};
export type DefaultGraphQL<T extends string, M, I, L> = {
  refName: string;
  modelRef: Type<M>;
  inputRef: Type<I>;
  lightModelRef?: Type<L>;
} & DefaultValueObj<T, M> &
  PurifyFuncObj<T, I> &
  CrystalizeFuncObj<T, M, L> &
  FragmentObj<T> &
  DefaultGqls<T, M, InputOf<I>, L>;

export const createGraphQL = <T extends string, M extends L, I, L>(
  name: T,
  target: Type<M>,
  inputRef: Type<I>,
  lightModelRef: Type<L>
): DefaultGraphQL<T, M, I, L> => {
  const refName = getClassMeta(target).refName;
  const [fieldName, className] = [Utils.lowerlize(refName), Utils.capitalize(refName)];
  return {
    refName,
    modelRef: target,
    inputRef,
    lightModelRef,
    [`default${className}`]: Object.assign(new target() as any, makeDefault<M>(target)),
    [`purify${className}`]: makePurify<I>(inputRef),
    [`crystalize${className}`]: makeCrystalize<M>(target),
    [`lightCrystalize${className}`]: makeCrystalize<L>(lightModelRef),
    [`${fieldName}Fragment`]: extractDependentFragments([target]),
    [`light${className}Fragment`]: extractDependentFragments([lightModelRef]),
    ...makeDefaultQMs<T, M, I, L>(target, inputRef, lightModelRef),
  } as unknown as DefaultGraphQL<T, M, I, L>;
};
