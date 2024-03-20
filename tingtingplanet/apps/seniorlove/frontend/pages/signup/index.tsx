import { DriverOutlined, LogoOutlined, UserOutlined } from "@seniorlove/frontend/components";
import { useState } from "react";
import Router from "next/router";

export default function SignUp() {
  const [isDriver, setIsDriver] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className=" w-full flex justify-center py-6 ">
        <LogoOutlined width={113} />
      </div>
      <div className="flex w-full justify-around my-10">
        <button
          className={`btn w-5/12 hover:bg-white rounded-md border bg-white ${
            !isDriver ? "border-primary text-primary" : "border-secondary text-secondary"
          } h-80 `}
          onClick={() => setIsDriver(false)}
        >
          <UserOutlined className="w-full h-max mt-auto" fill={isDriver ? "#C9C9C9" : "#037D00"} />
          <div className="mt-auto text-3xl mb-4">관광객</div>
        </button>
        <button
          className={`btn w-5/12 hover:bg-white rounded-md border bg-white ${
            isDriver ? "border-primary text-primary" : "border-secondary text-secondary"
          } h-80`}
          onClick={() => setIsDriver(true)}
        >
          <DriverOutlined className="w-full  h-max mt-auto" fill={!isDriver ? "#C9C9C9" : "#037D00"} />
          <div className="mt-auto text-3xl mb-4">주선자</div>
        </button>
      </div>
      <div className="w-full flex justify-center mt-auto self-end mb-16">
        <button
          className=" w-3/4 text-3xl h-14 font-bold btn-primary text-white rounded-md"
          onClick={() => Router.push(`/signup/${isDriver ? "driver" : "user"}`)}
        >
          다음
        </button>
      </div>
    </div>
  );
}
