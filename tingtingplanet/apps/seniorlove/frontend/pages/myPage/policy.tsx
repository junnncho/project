import { tingtingPolicy } from "@shared/util-client";

export default function Policy() {
  return (
    <div className="container my-4">
      <div className="text-xl py-2">[필수] 사용자 연령확인</div>
      <div className=" min-h-[20px] overflow-scroll max-h-96 flex flex-col items-start gap-4 whitespace-pre-wrap break-words border rounded-sm border-primary p-4">
        {tingtingPolicy({ useFor: "termsOfAge" })}
      </div>
      <div className="text-xl py-2">[필수] 개인정보수집 및 이용동의</div>
      <div className=" min-h-[20px] overflow-scroll max-h-96 flex flex-col items-start gap-4 whitespace-pre-wrap break-words border rounded-sm border-primary p-4">
        주식회사 팅팅플래닛은 원활한 서비스 제공을 위해 최소한의 범위 내에서 아래와 같이 개인정보를 수집 / 이용합니다.
        <table className="border-primary table table-fixed m-4">
          <thead>
            <th className="w-1/3 static" style={{ position: "static" }}>
              {" "}
              수집 및 이용 목적{" "}
            </th>
            <th className="w-1/3"> 수집 및 이용항목 </th>
            <th className="w-1/3"> 보유 및 이용기간 </th>
          </thead>
          <tbody>
            <tr>
              <td>
                서비스 가입 및 이용자 식별, 서비스 이용에 따른 정보제공 (고지사항, 서비스관련 상담, 민원사항처리등)
              </td>
              <td>성명, 이메일주소, 비밀번호, 상담내용</td>
              <td> 회원 탈퇴시까지</td>
            </tr>
            <tr>
              <td> 맞춤형 컨텐츠 추천 서비스 이용에 따른 이용실적 정보 통계·분석·서비스개선 </td>
              <td>필수, 선택 항목에서 수집하는 모든 정보</td>
              <td> 회원 탈퇴시까지</td>
            </tr>
            <tr>
              <td>불법/부정 이용 방지 및 서비스 분석</td>
              <td>
                성명, 이메일주소, 자동생성정보 - 기기정보 (기기종류, OS버전), 이용기록 (IP주소, 쿠키, 서비스 이용기록
                등)
              </td>
              <td>회원 탈퇴시까지 </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center items-center my-8"></div>
      <div className="text-xl py-2">[필수] 이용약관 동의</div>
      <div className=" min-h-[20px] overflow-scroll max-h-96 flex flex-col items-start gap-4 whitespace-pre-wrap break-words border rounded-sm border-primary p-4">
        {tingtingPolicy({ useFor: "termsOfUse" })}
      </div>
    </div>
  );
}
