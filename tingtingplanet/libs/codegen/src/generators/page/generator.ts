import * as path from "path";
import { ComponentGeneratorSchema } from "./schema";
import {
  Tree,
  generateFiles,
  names,
} from "@nrwl/devkit";
import pluralize from "pluralize";
const CONST_PATH = "libs/shared/util/src/constants.ts";
interface NameForm {
  appRoot: string;
  uiWebPath: string;
  dataAccessPath: string;
  model: string;
  Model: string;
  models: string;
  Models: string;
  template: string;
}

interface EditForm {
  type: "before" | "after";
  text: string;
  jumpline?: boolean;
  signal?: string;
  ifNotIncludes?: string;
}

const getDataAccessPath = (modulePath: string) => {
  const type = modulePath.split("/")[0];
  if (type === "apps") return "../../stores";
  else return `@${modulePath.split("/")[1]}/data-access`;
};
const generatePage = (tree: Tree, options: ComponentGeneratorSchema) => {
  const type = options.modulePath.split("/")[0] as "apps" | "libs";
  const uiWeb = type === "apps" ? "components" : "src/ui-web";
  const uiWebPath = options.modulePath
    .replace("module", "ui-web")
    .replace("backend", "frontend")
    .replace("src/ui-web", uiWeb);
  // 1. Generate Base Module Files
  const { propertyName, className } = names(options.modelName);
  const nameForm: NameForm = {
    appRoot: uiWebPath.replace("/components", ""),
    uiWebPath,
    dataAccessPath: getDataAccessPath(options.modulePath),
    model: propertyName,
    Model: className,
    models: pluralize(propertyName),
    Models: pluralize(className),
    template: "",
  };
  generateFiles(tree, path.join(__dirname, "page"), uiWebPath, nameForm);
};
export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  generatePage(tree, options);
}
