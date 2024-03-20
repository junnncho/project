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

const addText = (tree: Tree, path: string, { type, text, signal, ifNotIncludes, jumpline = true }: EditForm) => {
  if (ifNotIncludes && tree.read(path, "utf-8")?.includes(ifNotIncludes)) return;
  const content = tree.read(path, "utf-8");
  if (!content || content.indexOf(text) !== -1) return;
  if (signal) {
    type === "before"
      ? tree.write(path, `${content.replace(signal, `${text}${jumpline ? "\n" : ""}${signal}`)}`)
      : tree.write(path, `${content.replace(signal, `${signal}${jumpline ? "\n" : ""}${text}`)}`);
  } else {
    tree.write(
      path,
      type === "before"
        ? `${text}${jumpline ? "\n" : ""}${tree.read(path, "utf-8")}`
        : `${tree.read(path, "utf-8")}${jumpline ? "\n" : ""}${text}`
    );
  }
};

const getDataAccessPath = (modulePath: string) => {
  const type = modulePath.split("/")[0];
  if (type === "apps") return "../../stores";
  else return `@${modulePath.split("/")[1]}/data-access`;
};
const generateComponent = (tree: Tree, options: ComponentGeneratorSchema) => {
  const type = options.modulePath.split("/")[0] as "apps" | "libs";
  const uiWeb = type === "apps" ? "components" : "src/ui-web";
  const uiWebPath = options.modulePath
    .replace("module", "ui-web")
    .replace("backend", "frontend")
    .replace("src/ui-web", uiWeb);
  // 1. Generate Base Module Files
  const { propertyName, className } = names(options.modelName);
  const nameForm: NameForm = {
    dataAccessPath: getDataAccessPath(options.modulePath),
    model: propertyName,
    Model: className,
    models: pluralize(propertyName),
    Models: pluralize(className),
    template: "",
  };
  generateFiles(tree, path.join(__dirname, "component"), uiWebPath, nameForm);

  // 2. Add contants and sumup files
  addText(tree, `${uiWebPath}/index.ts`, {
    type: "after",
    text: `export * as ${className} from "./${propertyName}";`,
  });
};
export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  generateComponent(tree, options);
}
