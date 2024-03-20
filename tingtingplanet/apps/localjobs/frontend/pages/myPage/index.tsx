import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function MyPage() {
  const self = st.use.self();
  const router = useRouter();
  return (
    <div className="pb-20 text-xl">
      <div className="flex flex-row bg-primary h-56 justify-center mb-5"></div>
      <div className="mt-[-5rem] flex flex-col items-center">
        <Image
          src={self.image?.url ?? "/profile.png"}
          width={100}
          height={100}
          className="bg-white object-cover border-2 border-primary rounded-full"
          alt="profile"
        />
        <button
          className="btn mt-3 px-2 text-white rounded-xl min-h-fit h-10 text-lg font-base"
          onClick={() => {
            router.push("/myPage/edit");
          }}
        >
          프로필 편집
        </button>
      </div>
      <div className="flex flex-col mx-7 mt-3">
        <div className="font-extrabold mb-4">기본정보</div>
        <div className="ml-5 flex flex-row mb-6">
          <div className="w-1/3 text-gray-500 font-bold">{self.roles.includes("business") ? "회사 이름" : "이름"}</div>
          <div className="w-2/3 font-bold">{self.nickname}</div>
        </div>
        {!self.roles.includes("business") && (
          <div className="ml-5 flex flex-row mb-6">
            <div className="w-1/3 text-gray-500 font-bold">나이</div>
            <div className="w-2/3 font-bold">{dayjs().year() - self.dateOfBirth.year() + 1}</div>
          </div>
        )}

        <div className="ml-5 flex flex-row mb-6">
          <div className="w-1/3 text-gray-500 font-bold">주소</div>
          <div className="w-2/3 font-bold">{self?.location && `${self.location[0]} ${self.location[1]}`}</div>
        </div>
        <div className="ml-5 flex flex-row mb-6">
          <div className="w-1/3 text-gray-500 font-bold">휴대폰</div>
          <div className="w-2/3 font-bold">{self.phone}</div>
        </div>
        <div className="ml-5 flex flex-row mb-6">
          <div className="w-1/3 text-gray-500 font-bold">이메일</div>
          <div className="w-2/3 font-bold">{self.email}</div>
        </div>
        <div className="ml-5 flex flex-row mb-6">
          <div className="w-1/3 text-gray-500 font-bold">성실도</div>
          <div className="w-2/3 font-bold">{self.point}</div>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-5">
        <button
          className="btn mx-2 px-1 text-white text-lg font-extralight w-24"
          onClick={() => {
            st.do.logout("/job");
            router.push("/");
          }}
        >
          로그아웃
        </button>
        <button
          className="btn mx-2 px-1 text-white text-lg font-extralight w-24"
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
