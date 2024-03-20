import { Document } from "mongoose";
import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Id, ObjectId } from "@shared/util-server";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Doc as User } from "../user/user.model";
import { cnst } from "@shared/util";

type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U;

@InputType({ isAbstract: true })
@ObjectType()
@Schema()
export class StoryStat {
  @Field(() => Int)
  @Prop({ type: Number, index: true, default: 0, min: 0, required: true })
  views: number;

  @Field(() => Int)
  @Prop({ type: Number, index: true, default: 0, min: 0, required: true })
  likes: number;

  @Field(() => Int)
  @Prop({ type: Number, index: true, default: 0, min: 0, required: true })
  unlikes: number;

  @Field(() => Int)
  @Prop({ type: Number, index: true, default: 0, min: 0, required: true })
  comments: number;
}
@InputType()
export class StoryStatInput extends StoryStat {}
export const StoryStatSchema = SchemaFactory.createForClass(StoryStat);

@InputType({ isAbstract: true })
@ObjectType()
@Schema()
export class Chat {
  @Field(() => ID, { nullable: true })
  @Prop({ type: ObjectId, index: true, required: false })
  parent?: Id;

  @Field(() => ID, { nullable: true })
  @Prop({ type: ObjectId, index: true, required: true })
  from?: Id;

  @Field(() => String)
  @Prop({ type: String, enum: cnst.chatTypes, required: true, default: "text" })
  type: cnst.ChatType;

  @Field(() => [ID])
  @Prop([{ type: ObjectId, required: true, default: [] }])
  images?: Id[];

  @Field(() => ID, { nullable: true })
  @Prop([{ type: ObjectId, required: false }])
  emoji?: Id;

  @Field(() => String)
  @Prop({ type: String, required: true })
  text: string;

  @Field(() => Date)
  @Prop({ type: Date, index: true, required: true, default: () => new Date() })
  at: Date;
}
@InputType()
export class ChatInput extends Chat {}
export const ChatSchema = SchemaFactory.createForClass(Chat);
export interface ChatDoc extends Document<Id, any, Chat>, Omit<Chat, "id"> {}
export type ChatResolve = Overwrite<ChatDoc, { from?: User | null }>;

@InputType({ isAbstract: true })
@ObjectType()
@Schema()
export class ChatContribution {
  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  count: number;

  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  size: number;

  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  totalCount: number;

  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  totalSize: number;
}
@InputType()
export class ChatContributionInput extends ChatContribution {}
export const ChatContributionSchema = SchemaFactory.createForClass(ChatContribution);

@InputType({ isAbstract: true })
@ObjectType()
@Schema()
export class CallContribution {
  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  speakTime: number;

  @Field(() => Int)
  @Prop({ type: Number, default: 0, min: 0, required: true })
  callTime: number;
}
@InputType()
export class CallContributionInput extends CallContribution {}
export const CallContributionSchema = SchemaFactory.createForClass(CallContribution);
