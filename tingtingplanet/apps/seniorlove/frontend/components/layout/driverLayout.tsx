import {
  BiBell,
  BiBus,
  BiBusSchool,
  BiCalendar,
  BiChevronLeft,
  BiLogIn,
  BiLogOut,
  BiPowerOff,
  BiRefresh,
  BiSearch,
  BiUser,
} from "react-icons/bi";
import { LogoOutlined } from "../Icons";
import { st } from "@seniorlove/frontend/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineLink } from "react-icons/ai";
import { message } from "@shared/ui-web";
import { env } from "@seniorlove/frontend/env/env";
import { HiDocument } from "react-icons/hi";

const BottomNav = () => {
  const self = st.use.self();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className=" z-50 fixed flex justify-around w-full bottom-0 left-0 py-2 border-t rounded-t-3xl border-primary bg-white">
      {!self.id ? (
        <button
          className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white rounded h-max${
            pathname.startsWith("/signin") ? " text-primary" : ""
          }`}
          onClick={() => router.push("/signin")}
        >
          <BiPowerOff size={36} />
          <div className="text-xl font-bold">로그인</div>
        </button>
      ) : (
        <button
          className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white rounded h-max${
            pathname.startsWith("/myPage") ? " text-primary" : ""
          }`}
          onClick={() => router.push("/myPage")}
        >
          <BiUser size={36} />
          <div className="text-xl font-bold">내 정보</div>
        </button>
      )}
      <button
        className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white rounded h-max${
          !pathname.startsWith("/tour/myTour") && pathname.startsWith("/tour") ? " text-primary" : ""
        }`}
        onClick={() => router.push("/tour")}
      >
        <BiSearch size={36} />
        <div className="text-xl font-bold">여행찾기</div>
      </button>
      <button
        className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white rounded h-max${
          pathname.startsWith("/tour/myTour") ? " text-primary" : ""
        }`}
        onClick={() => router.push("/tour/myTour")}
      >
        <BiCalendar size={36} />
        <div className="text-xl font-bold">내 여행</div>
      </button>
      {self.roles.includes("business") && (
        <button
          className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white rounded h-max${
            pathname.startsWith("/driver/tour") ? " text-primary" : ""
          }`}
          onClick={() => router.push("/driver/tour")}
        >
          <BiBus size={36} />
          <div className="text-xl font-bold">여행관리</div>
        </button>
      )}
    </div>
  );
};
export const copyURL = (url: string) => {
  let t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = url;
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);
};
export const DriverLayout = ({ children }) => {
  const self = st.use.self();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const tourId = params.get("tourId");
  if (self.roles.includes("business")) {
  } else if (self.roles.includes("user") && !self.roles.includes("business")) {
    router.push("/tour");
  } else router.push("/");
  return (
    <div className="w-full">
      <div className="w-full py-2 sticky top-0 z-50 bg-white flex items-center border-b border-white shadow ">
        {pathname.startsWith("/driver/tour/new") ? (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/driver/tour")} />
            <div className="font-bold text-2xl flex-1 ml-5">새 여행 생성</div>
          </>
        ) : pathname.startsWith("/driver/tour") ? (
          <>
            {pathname.startsWith("/driver/tour/") && (
              <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/driver/tour")} />
            )}
            <div className="font-bold text-2xl flex-1 ml-5">내 여행현황</div>
            {tourId !== null && (
              <button
                className="btn mx-2 px-2 text-3xl"
                onClick={() => {
                  copyURL(`${env.origin}/tour/${tourId}`);
                  message.info({ content: "링크가 복사되었습니다" });
                }}
              >
                <AiOutlineLink />
              </button>
            )}
          </>
        ) : (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.back()} />
            <LogoOutlined className="font-bold  flex-1 " width={80} />
          </>
        )}
        <button
          className="btn mx-2 px-2 text-3xl"
          onClick={() => {
            if (tourId !== null) {
              router.refresh();
            } else if (pathname.startsWith("/driver/tour")) {
              st.do.refreshTourinDriver({ invalidate: true });
            } else {
              router.refresh();
            }
          }}
        >
          <BiRefresh />
        </button>
        {/* <button
          className="btn mx-2 px-2 text-3xl"
          onClick={() => {
            st.do.logout();
          }}
        >
          <BiLogOut />
        </button> */}
      </div>
      <BottomNav /> {children}
    </div>
  );
};

export const MainLayout = ({ children }) => {
  const self = st.use.self();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const tourId = useSearchParams().get("tourId");
  const gender = self.gender;
  return (
    <div className="w-full">
      <div className="w-full py-2 sticky top-0 z-50 bg-white flex items-center border-b border-white shadow ">
        {pathname.startsWith("/tour/myTour") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/tour")} /> */}
            <div className="font-bold text-2xl flex-1 ml-5">내 여행</div>
          </>
        ) : pathname.startsWith("/tour/") ? (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/tour")} />
            <div className="font-bold text-2xl flex-1 ml-5">여행 상세</div>
            <button
              className="btn mx-2 px-2 text-3xl"
              onClick={() => {
                copyURL(`${env.origin}/tour/${tourId}`);
                message.info({ content: "링크가 복사되었습니다" });
              }}
            >
              <AiOutlineLink />
            </button>
            {/* <LogoOutlined className="font-bold  flex-1 " width={80} /> */}
          </>
        ) : pathname.startsWith("/tour") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/tour")} /> */}
            <div className="font-bold text-2xl flex-1 ml-5">여행 리스트</div>
          </>
        ) : pathname.startsWith("/myPage/policy") ? (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/myPage")} />
            <div className="font-bold text-2xl flex-1 ml-5">개인정보 정책</div>
          </>
        ) : pathname.startsWith("/myPage") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/tour")} /> */}
            <div className="font-bold text-2xl flex-1 ml-5">내 정보</div>
          </>
        ) : (
          <>
            <LogoOutlined className="flex-1 font-bold " width={80} />
          </>
        )}
        <button
          className="btn mx-2 px-2 text-3xl"
          onClick={async () => {
            if (pathname.startsWith("/tour/myTour")) {
              await st.do.refreshTourInApply({ invalidate: true });
              await st.do.refreshTourInReserve({ invalidate: true });
            } else if (tourId !== null) {
              router.refresh();
            } else if (pathname.startsWith("/tour")) {
              await st.do.refreshTour({ invalidate: true });
            } else {
              router.refresh();
            }
          }}
        >
          <BiRefresh />
        </button>
        {/* {self.id ? (
          <button
            className="btn mx-2 px-2 text-3xl"
            onClick={() => {
              st.do.logout("/tour");
              router.push("/");
            }}
          >
            <BiLogOut />
          </button>
        ) : (
          <button className="btn mx-2 px-2 text-3xl" onClick={() => router.push("/signin?prevUrl=" + pathname)}>
            <BiLogIn />
          </button>
        )} */}
      </div>
      <BottomNav />
      {children}
    </div>
  );
};

export const UnLoggedInLayout = ({ children }) => {
  const self = st.use.self();
  const router = useRouter();
  const pathname = usePathname();

  // if (self.roles.includes("business")) router.push("/driver");
  // else if (self.roles.includes("user")) router.push("/tour");
  return (
    <>
      {" "}
      <div className="w-full">{children}</div>
      {pathname.startsWith("/policy") ? (
        <>
          <BottomNav />
          <div className="pb-20"></div>
        </>
      ) : null}
    </>
  );
};
