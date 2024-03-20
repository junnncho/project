import { env } from "../env/env";

import { Input } from "@shared/ui-web";
import { LogoOutlined } from "../components";
import { Turnstile } from "@marsidev/react-turnstile";
import { Utils } from "@shared/util";
import { st, gql } from "../stores";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@shared/util-client";

export default function signin() {
  const router = useRouter();
  const password = st.use.password();
  const turnstileToken = st.use.turnstileToken();
  const params = useSearchParams();
  const prevUrl = params.get("prevUrl");
  const keyringForm = st.use.keyringForm();
  const isSubmitable = turnstileToken && password.length >= 4;

  return (
    <div className="w-full px-4">
      <div className="flex justify-center w-full py-6 ">
        <LogoOutlined width={113} />
      </div>
      <div className="flex items-baseline w-full pt-4 mb-2">
        <p className="w-28">핸드폰 번호</p>
        <Input
          className="w-full"
          inputClassName="w-full h-10 min-h-10 placeholder:text-sm"
          // status={!keyringForm.accountId || Utils.isEmail(keyringForm.accountId) ? "" : "error"}
          placeholder="전화번호를 입력하세요."
          value={keyringForm.phone ?? ""}
          onChange={(e) => st.do.setPhoneOnKeyring(Utils.formatPhone(e.target.value))}
        />
      </div>
      <div className="flex items-baseline w-full mb-2">
        <p className="w-28">비밀번호</p>
        <Input.Password
          className="w-full"
          inputClassName="w-full h-10 min-h-10 placeholder:text-sm"
          // status={!password.length || password.length >= 7 ? "" : "error"}
          value={password}
          onChange={(e) => st.do.setPassword(e.target.value)}
          onPressEnter={() => isSubmitable && st.do.signinPassword2()}
        />
      </div>
      <div className="flex justify-center mb-2">
        <Turnstile
          siteKey={env.cloudflare.siteKey}
          options={{ theme: "light" }}
          onSuccess={(token) => st.do.setTurnstileToken(token)}
        />
      </div>
      <button
        className="w-full mt-5 btn btn-primary text-3xl text-white"
        disabled={!isSubmitable}
        onClick={async () => {
          await st.do.signinPassword2({ loginType: "skipReplace" });
          client.mobileToken && (await gql.addMobileToken(client.mobileToken));
          if (prevUrl?.includes("tour/")) router.push(prevUrl);
          else {
            router.push("/tour");
          }
        }}
      >
        로그인
      </button>
      <button
        className="w-full mt-2 btn btn-primary text-3xl text-white"
        onClick={() => {
          router.push("/signup");
        }}
      >
        회원가입
      </button>
      <button
        className="w-full mt-2 btn btn-primary text-3xl text-white"
        onClick={() => {
          router.push("/");
        }}
      >
        돌아가기
      </button>
    </div>
  );
}
