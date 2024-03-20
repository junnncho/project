import { LogoOutlined } from "@localjobs/frontend/components";
import { useState } from "react";
import Router from "next/router";
import Image from "next/image";

export default function SignUp() {
  const [isEmployer, setIsEmployer] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className=" w-full flex justify-center py-6 ">
        <LogoOutlined width={113} />
      </div>
      <div className="flex w-full justify-around my-10">
        <button
          className={`btn w-5/12 hover:bg-white rounded-md bg-white shadow-slate-400 shadow-xl h-56 ${
            !isEmployer ? "border-blue-600" : "border-gray-300"
          }`}
          onClick={() => setIsEmployer(false)}
        >
          <div></div>
          <Image alt="employee" src="/employee.png" width={150} height={150} />
          <div className="text-2xl text-black">구직자</div>
        </button>
        <button
          className={`btn w-5/12 hover:bg-white rounded-md bg-white shadow-xl shadow-slate-400 h-56 ${
            isEmployer ? "border-blue-600 " : " border-gray-300"
          }`}
          onClick={() => setIsEmployer(true)}
        >
          <Image alt="employee" src="/employer.png" width={150} height={150} />
          <div className="text-2xl text-black">구인자</div>
        </button>
      </div>
      <div className="w-full flex justify-center mt-auto self-end mb-16">
        <button
          className=" w-3/4 text-2xl h-14 font-bold btn-primary text-white rounded-3xl"
          onClick={() => Router.push(`/signup/${isEmployer ? "employer" : "user"}`)}
        >
          다음
        </button>
      </div>
    </div>
  );
}
