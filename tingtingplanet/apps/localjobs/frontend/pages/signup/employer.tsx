import { Button, Checkbox, Input, message, Select } from "@shared/ui-web";
import { LogoOutlined } from "@localjobs/frontend/components";
import { Turnstile } from "@marsidev/react-turnstile";
import { locationMap, Utils } from "@shared/util";
import { client, tingtingPolicy } from "@shared/util-client";
import { env } from "@localjobs/frontend/env/env";
import { gql, st } from "@localjobs/frontend/stores";
import { useState } from "react";
import Router from "next/router";
import { Field } from "@shared/ui-web";
import dayjs from "dayjs";
import { SignupPhone } from "@localjobs/frontend/components/keyring/signupPhone";

export default function SignUp() {
  const password = st.use.password();
  const passwordConfirm = st.use.passwordConfirm();
  const userForm = st.use.userForm();
  const keyringForm = st.use.keyringForm();
  const turnstileToken = st.use.turnstileToken();
  const signupKeyring = st.use.signupKeyring();
  const [termsOfAge, setTermsOfAge] = useState<boolean>(false);
  const [termsOfUse, setTermsOfUse] = useState<boolean>(false);
  const [termsOfPrivateInformation, setTermsOfPrivateInformation] = useState<boolean>(false);
  const signUpSubmitable =
    !Utils.isEmail(userForm.email) ||
    !(termsOfAge && termsOfPrivateInformation && termsOfUse) ||
    // !Utils.isPhoneNumber(keyringForm.phone) ||
    password !== passwordConfirm ||
    password.length < 8 ||
    !signupKeyring?.verifies.includes("phone") ||
    !userForm.nickname ||
    !userForm.location ||
    !Object.keys(locationMap).includes(userForm.location[0]) ||
    !locationMap[userForm.location[0]].includes(userForm.location[1]);
  const signup = async () => {
    if (!turnstileToken || !signupKeyring) return;
    const keyring = await gql.shared.signupPasswordPhone(
      keyringForm.phone ?? "",
      password,
      turnstileToken,
      signupKeyring.id
    );
    await gql.shared.activateUser(keyring.id);
    const jwt = await gql.shared.signinPasswordPhone(keyringForm.phone ?? "", password, turnstileToken);
    client.setJwt(jwt);
    // const keyring = await gql.shared.myKeyring();
    await gql.shared.updateKeyring(keyring.id, { name: keyring.name });
    const self = await gql.whoAmI();
    st.do.setPhoneOnUser(keyringForm.phone ?? "");
    const input = gql.purifyUser({
      ...self,
      nickname: userForm.nickname ?? "회사이름",
      gender: "male",
      dateOfBirth: dayjs("1980-01-01"),
      image: userForm.image ?? null,
      location: userForm.location ?? ["서울", "종로"],
      phone: keyringForm.phone ?? "",
      detailLocation: userForm.detailLocation ?? "",
      email: userForm.email ?? "",
      // mobileToken: client.mobileToken ?? null,
    });
    if (input) {
      await gql.updateUser(self.id, input);
      await gql.addUserRole(self.id, "business");
    }
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex justify-center w-full py-6 ">
        <LogoOutlined width={113} />
      </div>
      <div className="flex items-center justify-center mx-10 align-middle">
        <div className="">
          {/* <div className="flex justify-center mt-12 mb-6 text-3xl">회원가입</div> */}
          {/* <div className="flex my-6">
            <div className="flex items-center justify-center align-middle w-28">전화번호</div>
            <Input
              className=""
              value={keyringForm.phone ?? ""}
              onChange={(e) => st.do.setPhoneOnKeyring(Utils.formatPhone(e.target.value))}
            />
          </div> */}
          <SignupPhone disabled={false} />

          <div className="flex my-6">
            <div className="flex items-center justify-center align-middle w-28">비밀번호</div>
            <Input.Password
              className=""
              value={password}
              onChange={(e) => st.do.setPassword(e.target.value)}
              status={password.length && password.length < 8 ? "error" : undefined}
            />
          </div>
          <div className="flex my-6">
            <div className="flex items-center text-sm justify-center align-middle w-28">비밀번호 확인</div>
            <Input.Password
              className=""
              value={passwordConfirm}
              onChange={(e) => st.do.setPasswordConfirm(e.target.value)}
              status={passwordConfirm.length && passwordConfirm !== password ? "error" : undefined}
            />
          </div>
          <div className="flex my-6">
            <div className="flex items-center justify-center align-middle w-28">회사 이름</div>
            <Input
              className=""
              value={userForm.nickname}
              onChange={(e) => {
                st.do.setNicknameOnUser(e.target.value);
                st.do.setNameOnKeyring(e.target.value);
              }}
            />
          </div>
          <div className="flex my-6">
            <div className="flex items-center justify-center align-middle w-28">채용 이메일</div>
            <Input
              className=""
              value={userForm.email ?? ""}
              onChange={(e) => st.do.setEmailOnUser(e.target.value)}
              status={userForm.email?.length ? (!Utils.isEmail(userForm.email) ? "error" : "success") : undefined}
              validate={(value: string) => value.length >= 3 && value.length <= 20 && !!Utils.isEmail(userForm.email)}
              invalidMessage="3자 이상 20자 이내로 입력해주세요."
            />
            {/* <div>올바르지 않은 이메일</div> */}
          </div>
          <div className="flex my-4">
            <div className="w-28 items-center text-base align-middle flex justify-center">기업 로고</div>
            <div className="">
              <Field.Img
                label=""
                file={userForm.image}
                addFiles={st.do.uploadImageOnUser}
                onRemove={() => st.do.setImageOnUser(null)}
                direction="vertical"
                isCircle
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center self-start py-4 gap-7 ">
        <div className="flex items-center ">
          <div className="w-28 text-center text-sm">1차 회사 지역 선택</div>
          <Select
            value={userForm.location ? userForm.location[0] : "시/도"}
            selectClassName=" input input-bordered duration-300 focus:outline-none placeholder:text-gray-200"
            onChange={(city) => {
              st.do.writeOnUser("location", [city.toString(), "상세지역"]);
            }}
          >
            {Object.keys(locationMap).map((key) => (
              <Select.Option key={key} value={key}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center ">
          <div className="w-28 text-center text-sm">2차 회사 지역 선택</div>
          <Select
            selectClassName=" input input-bordered duration-300 focus:outline-none placeholder:text-gray-200"
            value={userForm.location ? userForm.location[1] : "상세지역"}
            onChange={(district) =>
              st.do.writeOnUser("location", [userForm.location ? userForm.location[0] : "", district.toString()])
            }
          >
            {userForm.location &&
              userForm.location[0] &&
              locationMap[userForm.location[0]].map((value) => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </div>
      </div>
      <div className="flex my-6">
        <div className="flex items-center justify-center align-middle w-28">회사 상세주소</div>
        <Input
          className=""
          value={userForm.detailLocation}
          onChange={(e) => {
            st.do.setDetailLocationOnUser(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center w-full my-4 hidden">
        <Turnstile
          siteKey={env.cloudflare.siteKey}
          options={{ theme: "light" }}
          onSuccess={(token) => st.do.setTurnstileToken(token)}
        />
      </div>
      <div className="container my-4">
        <div className="text-xl py-2">[필수] 사용자 연령확인</div>
        <div className=" min-h-[20px] overflow-scroll max-h-96 flex flex-col items-start gap-4 whitespace-pre-wrap break-words border rounded-sm border-primary p-4">
          {tingtingPolicy({ useFor: "termsOfAge" })}
        </div>

        <div className="w-full flex justify-center items-center my-8">
          <Checkbox
            checked={termsOfAge}
            onChange={(e) => setTermsOfAge(e.target.checked)}
            checkboxClassName="checkbox-primary"
            labelClassName="mt-0"
          >
            동의합니다.
          </Checkbox>
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
        <div className="w-full flex justify-center items-center my-8">
          <Checkbox
            checked={termsOfPrivateInformation}
            onChange={(e) => setTermsOfPrivateInformation(e.target.checked)}
            checkboxClassName="checkbox-primary"
            labelClassName="mt-0"
          >
            동의합니다.
          </Checkbox>
        </div>
        <div className="text-xl py-2">[필수] 이용약관 동의</div>
        <div className=" min-h-[20px] overflow-scroll max-h-96 flex flex-col items-start gap-4 whitespace-pre-wrap break-words border rounded-sm border-primary p-4">
          {tingtingPolicy({ useFor: "termsOfUse" })}
        </div>
        <div className="w-full flex justify-center items-center my-8">
          <Checkbox
            checked={termsOfUse}
            onChange={(e) => setTermsOfUse(e.target.checked)}
            checkboxClassName="checkbox-primary"
            labelClassName="mt-0"
          >
            동의합니다.
          </Checkbox>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Button
          className={`w-32 md:w-1/4 h-16 m-3 text-2xl btn ${!signUpSubmitable ? "btn-primary" : " bg-neutral"}`}
          onClick={async () => {
            if (password !== passwordConfirm) return message.error("비밀번호가 일치하지 않습니다.");
            if (!Utils.isEmail(userForm.email)) return message.error("올바르지 않은 이메일입니다.");
            if (password.length < 8) return message.error("비밀번호는 8자리 이상이어야 합니다.");
            if (!signupKeyring?.verifies.includes("phone")) return message.error("휴대폰 인증을 완료해주세요.");
            if (!userForm.nickname) return message.error("회사 이름을 입력해주세요.");
            if (!userForm.location || !Object.keys(locationMap).includes(userForm.location[0]))
              return message.error("지역을 선택해주세요.");
            if (!userForm.location || !locationMap[userForm.location[0]].includes(userForm.location[1]))
              return message.error("지역을 선택해주세요.");
            if (!(termsOfAge && termsOfPrivateInformation && termsOfUse))
              return message.error("필수약관에 모두 동의해주세요.");
            await signup();
            Router.push("/employer/job");
          }}
        >
          가입하기
        </Button>
        <Button
          className="h-16 text-2xl w-32 m-3 md:w-1/4 btn-primary"
          onClick={() => {
            Router.push("/");
          }}
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
}
