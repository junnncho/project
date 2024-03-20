import { LogoOutlined } from "../components";
import { Keyring } from "@shared/ui-web";
import { client } from "@shared/util-client";
import { env } from "../env/env";

import { Input } from "@shared/ui-web";
import { Turnstile } from "@marsidev/react-turnstile";
import { Utils } from "@shared/util";
import { st, gql } from "../stores";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  const router = useRouter();
  const self = st.use.self();
  const password = st.use.password();
  const turnstileToken = st.use.turnstileToken();
  const params = useSearchParams();
  const prevUrl = params.get("prevUrl");
  const keyringForm = st.use.keyringForm();
  const isSubmitable = turnstileToken && password.length >= 4;
  if (self.roles.includes("business")) {
    router.push("/employer/job");
  } else if (self.roles.includes("user")) {
    router.push("/job");
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-around">
      <div className=" w-full flex flex-col items-center justify-center py-6">
        <LogoOutlined width={300} />
        <div className="flex flex-col items-center mt-8 text-primary text-2xl">
          <div className="font-bold">자신감을 되찾고 싶다면?!</div>
          <div className="text-gray-500 text-sm">다양한 생활 속 퀘스트들을 클리어하고 취뽀까지!!</div>
        </div>
      </div>
      <div className=" w-full flex flex-col items-center px-4">
        <div className="flex items-baseline w-5/6 pt-4 mb-2">
          <Input
            className="w-full"
            inputClassName="w-full h-10 min-h-10 placeholder:text-sm"
            // status={!keyringForm.accountId || Utils.isEmail(keyringForm.accountId) ? "" : "error"}
            placeholder="전화번호"
            value={keyringForm.phone ?? ""}
            onChange={(e) => st.do.setPhoneOnKeyring(Utils.formatPhone(e.target.value))}
          />
        </div>
        <div className="flex items-baseline w-5/6 mb-2">
          <Input.Password
            className="w-full"
            placeholder="비밀번호"
            inputClassName="w-full h-10 min-h-10 placeholder:text-sm"
            // status={!password.length || password.length >= 7 ? "" : "error"}
            value={password}
            onChange={(e) => st.do.setPassword(e.target.value)}
            onPressEnter={() => isSubmitable && st.do.signinPassword2()}
          />
        </div>
        <div className="flex justify-center mb-2 hidden">
          <Turnstile
            siteKey={env.cloudflare.siteKey}
            options={{ theme: "light" }}
            onSuccess={(token) => st.do.setTurnstileToken(token)}
          />
        </div>
        <button
          className=" w-3/4 btn btn-primary h-10 rounded mt-6 text-white text-xl"
          disabled={!isSubmitable}
          onClick={async () => {
            await st.do.signinPassword2({ loginType: "skipReplace" });
            client.mobileToken && (await gql.addMobileToken(client.mobileToken));
            if (prevUrl?.includes("job/")) router.push(prevUrl);
            else {
              router.push("/job");
            }
          }}
        >
          로그인
        </button>
        <div className="flex items-center justify-center w-full mt-4">
          계정이 없으신가요?{" "}
          <Link className="ml-2 text-blue-600 font-semibold underline" href="/signup">
            회원가입
          </Link>
        </div>
        {/* <Keyring.Action.SSOButtons
          uri={client.uri.replace("/graphql", "")}
          className="mt-6"
          ssoTypes={["naver", "kakao"]}
        /> */}
      </div>
    </div>
  );
}

export default Index;
