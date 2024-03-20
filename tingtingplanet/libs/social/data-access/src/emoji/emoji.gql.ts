import { BaseGql, Field, InputType, Int, ObjectType, PickType, createGraphQL } from "@shared/util-client";
import { cnst } from "@shared/util";
import { gql as shared } from "@shared/data-access";

@InputType("EmojiInput")
export class EmojiInput {
  @Field(() => String)
  name: string;

  @Field(() => shared.File)
  file: shared.File;
}

@ObjectType("Emoji", { _id: "id" })
export class Emoji extends BaseGql(EmojiInput) {
  @Field(() => String)
  status: cnst.EmojiStatus;
}

@ObjectType("LightEmoji", { _id: "id", gqlRef: "Emoji" })
export class LightEmoji extends PickType(Emoji, ["status", "file"] as const) {}

@ObjectType("EmojiSummary")
export class EmojiSummary {
  @Field(() => Int)
  totalEmoji: number;
}
export const emojiQueryMap: { [key in keyof EmojiSummary]: any } = {
  totalEmoji: { status: { $ne: "inactive" } },
};

export const emojiGraphQL = createGraphQL("emoji" as const, Emoji, EmojiInput, LightEmoji);
export const {
  getEmoji,
  listEmoji,
  emojiCount,
  emojiExists,
  createEmoji,
  updateEmoji,
  removeEmoji,
  emojiFragment,
  purifyEmoji,
  crystalizeEmoji,
  lightCrystalizeEmoji,
  addEmojiFiles,
  defaultEmoji,
  mergeEmoji,
} = emojiGraphQL;
