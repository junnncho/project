import { Locale, baseLocale } from "@shared/util-client";
import { User } from "./user.gql";

export const userLocale = {
  ...baseLocale,
  // roles: ["Roles", "역할"],
  // keyring: ["Keyring", "Keyring"],
  // lastLoginAt: ["Last Login At", "마지막 로그인 시간"],
  // status: ["Status", "상태"],
  // chatBoards: ["Chat Board Id", "채팅방 아이디"],
  // nickname: ["Nickname", "닉네임"],
  // image: ["Image", "이미지"],
  // requestRoles: ["Request Roles", "역할 요청"],
  // dateOfBirth: ["Birthday", "생일"],
  // gender: ["Gender", "성별"],
  // interest: ["Interest", "관심사"],
  nickname: ["Nickname", "닉네임"],
  image: ["Image", "이미지"],
  requestRoles: ["Request Roles", "역할 요청"],
  dateOfBirth: ["Birthday", "생일"],
  gender: ["dsafs", "ㅁㄴ알"],
  interest: ["Interest", "관심사"],
  roles: ["Roles", "역할"],
  keyring: ["Keyring", "Keyring"],
  lastLoginAt: ["Last Login At", "마지막 로그인 시간"],
  status: ["Status", "상태"],
  chatBoards: ["Chat Board Id", "채팅방 아이디"],
  phone: ["phonenumber", "전화번호"],
  mobileToken: ["mobileToken", "모바일토큰"],
} as const;

export type UserLocale = Locale<"user", User, typeof userLocale>;
