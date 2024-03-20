import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function MyPage() {
  const self = st.use.self();
  const router = useRouter();
  return (
    <div className="pb-20 pt-4">
      <div className="flex flex-row justify-center mb-5">
        <Image
          src={self.image?.url ?? "/seniorlove_logo.png"}
          width={190}
          height={190}
          className="object-cover border-2 border-primary rounded-lg"
          alt="profile"
        />
      </div>
      <div className="w-full flex flex-row border-y border-secondary py-4 font-semibold text-xl">
        <span className="ml-2">닉네임</span>
        <span className="ml-auto mr-2">{self.nickname}</span>
      </div>
      <div className="w-full flex flex-row border-b border-secondary py-4 font-semibold text-xl">
        <span className="ml-2">전화번호</span>
        <span className="ml-auto mr-2">{self.phone}</span>
      </div>
      <div className="w-full flex flex-row border-b border-secondary py-4 font-semibold text-xl">
        <span className="ml-2">성별</span>
        <span className="ml-auto mr-2">{self.gender === "female" ? "여성" : "남성"}</span>
      </div>
      <div className="w-full flex flex-row border-b border-secondary py-4 font-semibold text-xl">
        <span className="ml-2">나이</span>
        <span className="ml-auto mr-2">{dayjs().year() - self.dateOfBirth.year() + 1}</span>
      </div>
      <div className="flex flex-row justify-center mt-5">
        <button
          className="btn mx-2 px-2 text-2xl w-32"
          onClick={() => {
            st.do.logout("/tour");
            router.push("/");
          }}
        >
          로그아웃
        </button>
        <button
          className="btn mx-2 px-2 text-2xl w-32"
          onClick={() => {
            router.push("/myPage/edit");
          }}
        >
          편집
        </button>
      </div>
      <div className="my-4 text-gray-500 w-full flex justify-center">
        <button className=" cursor-pointer text-gray-500 underline" onClick={() => router.push("/myPage/policy")}>
          개인정보 및 이용약관
        </button>
      </div>
    </div>
  );
}
