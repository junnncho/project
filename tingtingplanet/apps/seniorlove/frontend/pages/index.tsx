import { LogoOutlined } from "../components";
import { st } from "../stores";
import { useRouter } from "next/navigation";
import { Keyring } from "@shared/ui-web";
import { client } from "@shared/util-client";

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  const router = useRouter();
  const self = st.use.self();
  if (self.roles.includes("business")) {
    router.push("/driver/tour");
  } else if (self.roles.includes("user")) {
    router.push("/tour");
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-around">
      <div className=" w-full flex flex-col items-center justify-center py-6">
        <LogoOutlined width={300} />
        <div className="flex flex-col items-center mt-8 text-primary text-2xl">
          <div>여행을 떠나요</div>
        </div>
      </div>
      <div className=" w-full flex flex-col items-center px-4">
        <button
          className=" w-full btn btn-primary h-12 rounded my-2 text-white text-3xl"
          onClick={() => router.push("/signin")}
        >
          로그인
        </button>
        <button
          className=" w-full btn btn-primary h-12 rounded my-2 text-white text-3xl"
          onClick={() => router.push("/signup")}
        >
          회원가입
        </button>
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
