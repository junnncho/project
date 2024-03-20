import { Account } from "../middlewares";
import { DataLoader, DefaultDocMtds, DefaultMdlStats, Id, Query, createLoader } from "../dbConfig";
import { Document, Model } from "mongoose";
import { Logger } from "@nestjs/common";

export interface LoadConfig<Doc = any> {
  account?: Account | null;
  address?: string;
  ip?: string;
  tail?: Partial<Doc>;
}

export class LogService {
  readonly logger: Logger;
  constructor(name: string) {
    this.logger = new Logger(name);
  }
}
export class LoadService<
  Mdl extends Model<any> & DefaultMdlStats<any, any>,
  Doc extends Document<any> & DefaultDocMtds<any>,
  Input
> extends LogService {
  loader: DataLoader<Id, Doc>;
  model: Mdl;
  constructor(private name: string, model: Mdl) {
    super(name);
    this.loader = createLoader<Id, Doc>(model);
    this.model = model;
  }
  async load(id?: Id) {
    this.logger.debug(`service:load model:${this.name} input: {id: ${id?.toString()}} `);
    return (id && (await this.loader.load(id))) as Doc | null;
  }
  async loadMany(ids: Id[]) {
    this.logger.debug(`service:loadMany model:${this.name} input: {id: [${ids.toString()}]} `);
    return (await this.loader.loadMany(ids)) as Doc[];
  }
  async get(id: Id): Promise<Doc> {
    this.logger.debug(`service:get model:${this.name} input: {id: ${id.toString()}} `);
    const doc = await this.load(id);
    if (!doc) throw new Error(`No Document (${this.name}): ${id}`);
    return doc;
  }
  async list(query: Query<Doc>, skip = 0, limit = 0, sort: any = {}): Promise<Doc[]> {
    this.logger.debug(
      `service:list model:${this.name} input: {query: ${JSON.stringify(
        query
      )} skip: ${skip} limit: ${limit} sort: ${JSON.stringify(sort)}} `
    );
    return await this.model
      .find({ status: { $ne: "inactive" }, ...query })
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }
  async pick(query: Query<Doc>): Promise<Doc> {
    this.logger.debug(`service:pick model:${this.name} input: {query: ${JSON.stringify(query)}} `);
    const doc = await this.model.findOne(query);
    if (!doc) throw new Error(`No Document (${this.name}): ${query}`);
    return doc;
  }
  async exists(query: Query<Doc>): Promise<boolean> {
    this.logger.debug(`service:exists model:${this.name} input: {query: ${JSON.stringify(query)}} `);
    return await (this.model as any).exists(query);
  }
  async count(query: Query<Doc>): Promise<number> {
    this.logger.debug(`service:count model:${this.name} input: {query: ${JSON.stringify(query)}} `);
    return await this.model.countDocuments({
      status: { $ne: "inactive" },
      ...query,
    });
  }
  async create(data: Input, config?: LoadConfig<Doc>): Promise<Doc> {
    this.logger.debug(`service:create model:${this.name} input: {data: ${JSON.stringify(data)}} `);
    const doc = await new this.model(data).save();
    if (config?.tail) {
      await doc.merge(config.tail).save();
    }
    return doc;
  }
  async update(id: Id, data: Partial<Doc>, config?: LoadConfig<Doc>): Promise<Doc> {
    this.logger.debug(`service:update model:${this.name} input: {id: ${id.toString()} data: ${JSON.stringify(data)}} `);
    const doc = await this.get(id);
    if (!doc) throw new Error(`No Document (${this.name}): ${id}`);
    Object.assign(doc, data, config?.tail ?? {});
    return await doc.save();
  }
  async remove(id: Id, config: LoadConfig<Doc> = {}): Promise<Doc> {
    this.logger.debug(`service:remove model:${this.name} input: {id: ${id.toString()}} `);
    const doc = await this.get(id);
    if (!doc) throw new Error(`No Document (${this.name}): ${id}`);
    Object.assign(doc, { status: "inactive" }, config?.tail ?? {});
    await doc.save();
    return doc;
  }
}
export class AddrLoadService<
  Mdl extends Model<any> & DefaultMdlStats<any, any>,
  Doc extends Document<any> & DefaultDocMtds<any>,
  Input
> extends LoadService<Mdl, Doc, Input> {
  addrLoader: DataLoader<string, Doc, string>;
  constructor(name: string, model: Mdl) {
    super(name, model);
    this.addrLoader = createLoader(model, "address");
  }
  async loadAddr(address?: string) {
    return (address && (await this.addrLoader.load(address))) as Doc | null;
  }
  async loadAddrMany(addresses: string[]) {
    return (await this.addrLoader.loadMany(addresses)) as Doc[];
  }
}
