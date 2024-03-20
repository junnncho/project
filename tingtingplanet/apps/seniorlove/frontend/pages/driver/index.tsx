import { DriverOutlined } from "@seniorlove/frontend/components";
import { useRouter } from "next/navigation";

export default function DriverMain() {
  const router = useRouter();
  return (
    <>
      <div className=" w-full flex justify-around my-10 ">
        <div className=" w-1/3 px-2">
          <button
            className={`btn w-full rounded-md border h-60  border-primary hover:bg-white hover:border-inherit`}
            onClick={() => router.push("/driver/tour/new")}
          >
            <DriverOutlined className="w-full h-max mt-auto max-h-40" />
            <div className="mt-auto text-xl mb-4">
              새 여행
              <p /> 생성하기
            </div>
          </button>
        </div>
        <div className=" w-1/3 px-2">
          <button
            className={`btn w-full rounded-md border h-60  border-primary hover:bg-white hover:border-inherit`}
            onClick={() => router.push("/driver/tour")}
          >
            <DriverOutlined className="w-full h-max mt-auto max-h-40" />
            <div className="mt-auto text-xl mb-4">
              내 여행
              <p /> 확인하기
            </div>
          </button>
        </div>
        <div className=" w-1/3 px-2">
          <button
            className={`btn w-full rounded-md border h-60 border-primary hover:bg-white hover:border-inherit`}
            onClick={() => router.push("/driver/tour")}
          >
            <DriverOutlined className="w-full h-max mt-auto max-h-40" />
            <div className="mt-auto text-xl mb-4">
              내 여행
              <p /> 편집하기
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
