import { Emoji, EmojiSummary } from "./emoji.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const emojiLocale = {
  ...baseLocale,
  name: ["Name", "이름"],
  token: ["Token", "토큰"],
  file: ["File", "파일"],
  totalEmoji: ["Total Emoji", "총 이모지"],
} as const;
export type EmojiLocale = Locale<"emoji", Emoji & EmojiSummary, typeof emojiLocale>;
