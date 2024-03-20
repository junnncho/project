import { Locale, baseLocale } from "@shared/util-client";
import { Quest, QuestSummary } from "./quest.gql";

export const questLocale = {
  ...baseLocale,
  field: ["Field", "필드"], // 샘플
  totalQuest: ["TotalQuest", "총 모델"], // 모델명 수정 필요
  name: ["Quest Name", "여행 이름"],
  employer: ["Quest Employer", "주선자"],
  departAt: ["depart time", "출발 시간"],
  phone: ["phone number", "전화번호"],
  dues: ["dues", "회비"],
  place: ["place", "집결 장소"],
  departPlace: ["depart place", "출발 장소"],
  content: ["content", "안내사항"],
  contentFiles: ["content files", "안내사항 파일"],
  maxMaleReserver: ["Max male reserver", "남성 예약자 제한"],
  maxFemaleReserver: ["Max female reserver", "여성 예약자 제한"],
  status: ["Quest status", "여행 상태"],
  totalFemaleReserver: ["total fem reserver number", "여성 예약자 수"],
  totalMaleReserver: ["total male reserver number", "남성 예약자 수"],
  totalMaleApplicant: ["total male aplicant nubmer", "남성 신청자 수"],
  totalFemaleApplicant: ["total fem applicant number", "여성 신청자 수"],
  femaleReservers: ["fem reserver list", "여성 예약자 명단"],
  maleReservers: ["male reserver list", "남성 예약자 명단"],
  femaleApplicants: ["fem applicant list", "여성 신청자 명단"],
  maleApplicants: ["male applicant list", "남성 신청자 명단"],
  distinctGender: ["distinctGender", "성별구분"],
  thumbnails: ["thumbnail", "썸네일"],
} as const;

export type QuestLocale = Locale<"quest", Quest & QuestSummary, typeof questLocale>;
