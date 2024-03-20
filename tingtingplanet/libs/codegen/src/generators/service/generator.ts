import * as path from 'path';
import { ServiceGeneratorSchema } from './schema';
import { Tree, generateFiles, names } from '@nrwl/devkit';
import pluralize from 'pluralize';
const CONST_PATH = 'libs/shared/util/src/constants.ts';
interface NameForm {
  dataAccessPath: string;
  model: string;
  Model: string;
  models: string;
  Models: string;
  template: string;
}

interface EditForm {
  type: 'before' | 'after';
  text: string;
  jumpline?: boolean;
  signal?: string;
  ifNotIncludes?: string;
}

const addText = (
  tree: Tree,
  path: string,
  { type, text, signal, ifNotIncludes, jumpline = true }: EditForm
) => {
  if (ifNotIncludes && tree.read(path, 'utf-8')?.includes(ifNotIncludes))
    return;
  const content = tree.read(path, 'utf-8');
  if (!content || content.indexOf(text) !== -1) return;
  if (signal) {
    type === 'before'
      ? tree.write(
          path,
          `${content.replace(
            signal,
            `${text}${jumpline ? '\n' : ''}${signal}`
          )}`
        )
      : tree.write(
          path,
          `${content.replace(
            signal,
            `${signal}${jumpline ? '\n' : ''}${text}`
          )}`
        );
  } else {
    tree.write(
      path,
      type === 'before'
        ? `${text}${jumpline ? '\n' : ''}${tree.read(path, 'utf-8')}`
        : `${tree.read(path, 'utf-8')}${jumpline ? '\n' : ''}${text}`
    );
  }
};

const getDataAccessPath = (modulePath: string) => {
  const type = modulePath.split('/')[0];
  if (type === 'apps') return '../../stores';
  else return `@${modulePath.split('/')[1]}/data-access`;
};

const generateModule = (tree: Tree, options: ServiceGeneratorSchema) => {
  // 1. Generate Base Module Files
  const { propertyName, className } = names(options.modelName);
  const nameForm: NameForm = {
    dataAccessPath: getDataAccessPath(options.modulePath),
    model: propertyName,
    Model: className,
    models: pluralize(propertyName),
    Models: pluralize(className),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'module'),
    options.modulePath,
    nameForm
  );

  // 2. Add contants and sumup files
  addText(tree, CONST_PATH, {
    type: 'after',
    text: `\nexport const ${propertyName}Statuses = ["active", "inactive"] as const;\nexport type ${className}Status = typeof ${propertyName}Statuses[number];`,
    ifNotIncludes: `${className}Status`,
  });
  addText(tree, `${options.modulePath}/db.ts`, {
    type: 'after',
    text: `export * as ${className} from "./${propertyName}/${propertyName}.model";`,
  });
  addText(tree, `${options.modulePath}/gql.ts`, {
    type: 'after',
    text: `export * from "./${propertyName}/${propertyName}.gql";`,
  });
  addText(tree, `${options.modulePath}/module.ts`, {
    type: 'before',
    text: `${className}Module,`,
    signal: 'ScalarModule,',
  });
  addText(tree, `${options.modulePath}/module.ts`, {
    type: 'before',
    text: `import { ${className}Module } from "./${propertyName}/${propertyName}.module";`,
    signal: `import { ScalarModule } from "./_scalar/scalar.module";`,
  });
  addText(tree, `${options.modulePath}/sample.ts`, {
    type: 'after',
    text: `export * from "./${propertyName}/${propertyName}.sample";`,
  });
  addText(tree, `${options.modulePath}/srv.ts`, {
    type: 'after',
    text: `export { ${className}Service } from "./${propertyName}/${propertyName}.service";`,
  });
  addText(tree, `${options.modulePath}/summary/summary.gql.ts`, {
    type: 'before',
    text: `import { ${className}Summary } from "../${propertyName}/${propertyName}.gql";`,
  });
  addText(tree, `${options.modulePath}/summary/summary.gql.ts`, {
    type: 'after',
    text: `  ${className}Summary,`,
    signal: `export const childSummaries = [`,
  });
  addText(tree, `${options.modulePath}/summary/summary.gql.ts`, {
    type: 'before',
    text: `Summary,\n    ${className}`,
    signal: `Summary {}`,
    jumpline: false,
  });

  addText(tree, `${options.modulePath}/summary/summary.service.ts`, {
    type: 'before',
    text: `import { ${className}Service } from "../${propertyName}/${propertyName}.service";`,
    signal: `@Injectable()`,
  });
  addText(tree, `${options.modulePath}/summary/summary.service.ts`, {
    type: 'after',
    text: `    private readonly ${propertyName}Service: ${className}Service,`,
    signal: `@InjectModel(Summary.name) Summary: Mdl,`,
  });
  addText(tree, `${options.modulePath}/summary/summary.service.ts`, {
    type: 'after',
    text: `      ...(await this.${propertyName}Service.summarize()),`,
    signal: `Service.summarize()),`,
  });
};
const generateComponent = (tree: Tree, options: ServiceGeneratorSchema) => {
  const type = options.modulePath.split('/')[0] as 'apps' | 'libs';
  const uiWeb = type === 'apps' ? 'components' : 'src/ui-web';
  const uiWebPath = options.modulePath
    .replace('module', 'ui-web')
    .replace('backend', 'frontend')
    .replace('src/ui-web', uiWeb);
  // 1. Generate Base Module Files
  const { propertyName, className } = names(options.modelName);
  const nameForm: NameForm = {
    dataAccessPath: getDataAccessPath(options.modulePath),
    model: propertyName,
    Model: className,
    models: pluralize(propertyName),
    Models: pluralize(className),
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'component'), uiWebPath, nameForm);

  // 2. Add contants and sumup files
  addText(tree, `${uiWebPath}/index.ts`, {
    type: 'after',
    text: `export * as ${className} from "./${propertyName}";`,
  });
};
const generateStore = (tree: Tree, options: ServiceGeneratorSchema) => {
  const type = options.modulePath.split('/')[0] as 'apps' | 'libs';
  const dataAccess = type === 'apps' ? 'stores' : 'src/data-access';
  const dataAccessPath = options.modulePath
    .replace('module', 'data-access')
    .replace('backend', 'frontend')
    .replace('src/data-access', dataAccess);
  // 1. Generate Base Module Files
  const { propertyName, className } = names(options.modelName);
  const nameForm: NameForm = {
    dataAccessPath: getDataAccessPath(options.modulePath),
    model: propertyName,
    Model: className,
    models: pluralize(propertyName),
    Models: pluralize(className),
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'store'), dataAccessPath, nameForm);

  // 2. Add contants and sumup files
  addText(tree, `${dataAccessPath}/gql.ts`, {
    type: 'after',
    text: `export * from "./${propertyName}/${propertyName}.gql";`,
  });
  addText(tree, `${dataAccessPath}/slice.ts`, {
    type: 'after',
    text: `export * from "./${propertyName}/${propertyName}.slice";`,
  });
  addText(tree, `${dataAccessPath}/store.ts`, {
    type: 'before',
    text: `import { ${className}State, add${className}ToStore } from "./${propertyName}/${propertyName}.store";`,
  });
  addText(tree, `${dataAccessPath}/store.ts`, {
    type: 'before',
    signal: 'State {}',
    jumpline: false,
    text: `State, ${className}`,
  });
  addText(tree, `${dataAccessPath}/store.ts`, {
    type: 'after',
    signal:
      'export const addToStore = ({ set, get, pick }: SetGet<RootState>) => ({',
    text: `...add${className}ToStore({ set, get, pick }),`,
  });
  addText(tree, `${dataAccessPath}/summary/summary.gql.ts`, {
    type: 'before',
    text: `import { ${className}Summary } from "../${propertyName}/${propertyName}.gql";`,
  });
  addText(tree, `${dataAccessPath}/summary/summary.gql.ts`, {
    type: 'after',
    jumpline: false,
    signal: 'export const summaries = [',
    text: `${className}Summary, `,
  });
  addText(tree, `${dataAccessPath}/summary/summary.gql.ts`, {
    type: 'before',
    jumpline: false,
    signal: 'Summary {}',
    text: `Summary, ${className}`,
  });
};
export default async function (tree: Tree, options: ServiceGeneratorSchema) {
  generateModule(tree, options);
  generateComponent(tree, options);
  generateStore(tree, options);
}
