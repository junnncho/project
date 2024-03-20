import { Locale } from "@shared/util-client";

export const mainLocale = {
  logout: ["Logout", "로그아웃"],
  footer1: ["This Admin System is Operated By TingTing", "이 어드민 시스템은 TingTing에서 운영합니다"],
  footer2: [
    "Support Contact: junnncho@tingting.com / +82)10-7445-3714",
    "지원 연락처:: junnncho@tingting.com / +82)10-7445-3714",
  ],
  profile: ["Profile", "프로필"],
  signIn: ["Sign In", "로그인"],
  signUp: ["Sign Up", "회원가입"],
  submit: ["Submit", "제출"],
  signUpFailed: ["Sign Up Failed", "회원가입 실패"],
  removeMsg: ["Are you sure to remove?", "정말로 삭제하시겠습니까?"],
  confirmMsg: ["Are you sure to {actionType}", "진행하시겠습니까? ({actionType})"],
  new: ["New", "신규"],
  ok: ["OK", "확인"],
  cancel: ["Cancel", "취소"],
  noData: ["No data found", "데이터가 없습니다"],
};

export type MainLocale = Locale<"main", unknown, typeof mainLocale>;
