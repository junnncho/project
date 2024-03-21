import {env} from "@junblog/frontend/env/env";
import { useApi } from "@junblog/frontend/stores/server";
import { useMeStore } from "@junblog/frontend/stores/client";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const Login = () => {
  const nickname = useMeStore((state) => state.nickname);
  const { mutate } = useApi.useLogOut();
  const image = useMeStore((state) => state.image);
  return (
    <>
      {nickname ? (
        <div className="flex flex-col">
          <Image
            src={image || "/icon.png"}
            width={70}
            height={70}
            className="bg-white object-cover border-2 border-black rounded-l-md "
            alt="profile"
          />
          <div onClick={() => mutate()} className="px-2 font-bold btn-hover rounded-r-md">
            로그아웃
          </div>
        </div>
      ) : (
        <Link
          href={`${env.endpoint}/auth/google`}
          passHref
          className="border-2 px-2 py-1 font-bold btn-hover rounded-md"
        >
          구글 로그인
        </Link>
      )}
    </>
  );
};

export const SimpleLogout = ({className})=>{
  const { mutate } = useApi.useLogOut();
  return  <div onClick={() => mutate()} className={twMerge("border-2 px-2 font-bold text-sm btn-hover rounded-md",className)}>
  로그아웃
</div>
}
