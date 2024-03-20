import { Chat } from "../_scalar";
import { ChatRoomInput, ChatRoomSchema } from "./chatRoom.gql";
import { Document, Model, Query, Schema as Sch } from "mongoose";
import { Id, dbConfig } from "@shared/util-server";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Doc as User } from "../user/user.model";
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;
@Schema(dbConfig.defaultSchemaOptions)
class ChatRoom extends ChatRoomSchema {}
export const name = ChatRoom.name;
export type Input = ChatRoomInput;
export type Raw = ChatRoom;
export interface DocType extends Document<Id, QryHelps, Raw>, DocMtds, Omit<Raw, "id"> {}
export type Doc = DocType & dbConfig.DefaultSchemaFields;
export type ChatRoomResolve = Overwrite<Doc, { users: User[] }>;
export interface Mdl extends Model<Doc>, MdlStats {}
export const schema: Sch<null, Mdl, DocMtds, QryHelps, null, MdlStats> = SchemaFactory.createForClass<Raw, Doc>(
  ChatRoom
) as any;

/**
 * * 5. 유틸리티 설계: 스키마를 손쉽게 사용할 유틸리티를 작성하세요.
 * ? 도큐먼트의 유틸리티를 위한 document method를 작성하세요.
 * ? 모델의 유틸리티를 위한 model statics를 작성하세요.
 * ? 모델의 유틸리티를 위한 query helpers를 작성하세요.
 */

// * 5. 1. Document Methods
interface DocMtds extends dbConfig.DefaultDocMtds<Doc> {
  addChat(chat: Partial<Chat> & { text: string }): Doc;
  addRead(userId: Id): Doc;
  addReads(userIds: Id[]): Doc;
}

schema.methods.addChat = function (this: Doc, chat: Partial<Chat> & { text: string }) {
  const defaultValue: Chat = {
    type: "text",
    text: "",
    images: [],
    at: new Date(),
  };
  console.log("addChat", { ...chat });
  this.chats.push({ ...defaultValue, ...chat });
  if (!chat.from) return this;
  const size = chat.text ? chat.text.length : 0;
  this.totalContribution.count += 1;
  this.totalContribution.size += size;
  this.totalContribution.totalCount += 1;
  this.totalContribution.totalSize += size;
  if (!chat.from) return this;
  const from = chat.from.toString();
  const contribution = this.contribution.get(from) ?? {
    count: 0,
    size: 0,
    totalCount: 0,
    totalSize: 0,
  };
  contribution.count += 1;
  contribution.size += size;
  contribution.totalCount += 1;
  contribution.totalSize += size;
  this.contribution.set(from, contribution);
  return this;
};
schema.methods.addRead = function (this: Doc, userId: Id) {
  this.read.set(String(userId), new Date());
  return this;
};
schema.methods.addReads = function (this: Doc, userIds: Id[]) {
  userIds.map((userId: Id) => this.addRead(userId));
  return this;
};

// * 5. 2. Model Statics
interface MdlStats extends dbConfig.DefaultMdlStats<Doc, Raw> {
  findActiveWithRoot(root: Id): Promise<Doc>;
  readById(chatRoomId: Id, userId: Id): Promise<Doc>;
  readOne(query: dbConfig.Query<Doc>, userId: Id): Promise<Doc>;
  readActiveWithRoot(root: Id, userId: Id): Promise<Doc>;
  readWithRoot(root: Id, userId: Id): Promise<Doc>;
  exitUser(root: Id, userId: Id): Promise<Doc>;
  enterUser(root: Id, userId: Id): Promise<Doc>;
  createNext(recentRoom: Doc, userIds?: Id[]): Promise<Doc>;
}
schema.statics.findActiveWithRoot = async function (root: Id) {
  const doc = await this.findOne({ root, status: "active" }).sort({
    createdAt: -1,
  });
  if (!doc) throw new Error("No Document");
  return doc;
};
schema.statics.readById = async function (chatRoomId: Id, userId: Id) {
  const doc = await this.pickById(chatRoomId);
  return await doc.addRead(userId).save();
};
schema.statics.readOne = async function (query: dbConfig.Query<Doc>, userId: Id) {
  const doc = await this.pickOne(query);
  return await doc.addRead(userId).save();
};
schema.statics.readActiveWithRoot = async function (root: Id, userId: Id) {
  const doc = await this.findOne({ root, status: "active" }).sort({
    createdAt: -1,
  });
  if (!doc) throw new Error("No Document");
  return await doc.addRead(userId).save();
};
schema.statics.readWithRoot = async function (root: Id, userId: Id) {
  const doc = await this.findOne({ root, status: "active" }).sort({
    createdAt: -1,
  });
  if (!doc) throw new Error("No Document");
  return await doc.addRead(userId).save();
};
schema.statics.exitUser = async function (root: Id, userId: Id) {
  return "wip" as any;
};
schema.statics.enterUser = async function (root: Id, userId: Id) {
  return "wip" as any;
};
schema.statics.createNext = async function (recentRoom: Doc, userIds?: Id[]) {
  let read = new Map();
  if (userIds) {
    userIds.forEach((userId: Id) => {
      const date = recentRoom.read.get(String(userId));
      date && read.set(String(userId), date);
    });
  } else {
    read = recentRoom.read;
  }
  const nextChatRoom = await this.create({
    ...(userIds ? { users: userIds } : { users: recentRoom.users }),
    root: recentRoom.root,
    rootCreatedAt: recentRoom.rootCreatedAt,
    roomNum: recentRoom.roomNum + 1,
    read,
    prevChat: recentRoom._id,
  });
  await recentRoom.merge({ nextChat: nextChatRoom._id }).save();
  return nextChatRoom;
  // return "wip" as any;
};

// * 5. 3. Model Statics
interface QryHelps extends dbConfig.DefaultQryHelps<Doc, QryHelps> {
  dumb: () => Query<any, Doc, QryHelps> & QryHelps;
}
schema.query.dumb = function () {
  return this.find({});
};
export const middleware = () => () => {
  /**
   * * 미들웨어 설계: 스키마 데이터 관리 시 사용할 미들웨어를 작성하세요.
   * ? save 시 자동으로 적용할 알고리즘을 적용하세요.
   */
  schema.pre<Doc>("save", async function (next) {
    const model = this.constructor as Mdl;
    if (this.isNew) model.addSummary(["total", this.status]);
    else if (this.status === "inactive" && this.isModified("status")) model.subSummary(["total", this.status]);
    // else model.moveSummary(this.getChanges().$set?.status, this.status);
    next();
  });
  return schema;
};
