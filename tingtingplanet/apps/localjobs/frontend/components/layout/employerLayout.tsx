import {
  BiBell,
  BiBus,
  BiBusSchool,
  BiCalendar,
  BiChevronLeft,
  BiCalendarStar,
  BiChat,
  BiRefresh,
  BiHomeAlt,
  BiSearch,
  BiUser,
  BiNotepad,
} from "react-icons/bi";
import { LogoOutlined } from "../Icons";
import { st } from "@localjobs/frontend/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineLink } from "react-icons/ai";
import { message } from "@shared/ui-web";
import { env } from "@localjobs/frontend/env/env";
import { HiDocument } from "react-icons/hi";
import Link from "next/link";

const BottomNav = () => {
  const self = st.use.self();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className=" z-50 fixed flex justify-around w-full bottom-0 left-0 py-2 border-t rounded-t-3xl border-primary bg-white">
      <button
        className={` flex flex-nowrap flex-col items-center cursor-pointe bg-white text-gray-400 rounded h-max${
          pathname.startsWith("/home") ? " text-primary" : ""
        }`}
        onClick={() => router.push("/home")}
      >
        <BiHomeAlt className=" font-thin" size={36} />
      </button>
      {self.roles.includes("business") ? (
        <button
          className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white text-gray-400 rounded h-max${
            pathname.startsWith("/employer/job") ? " text-primary" : ""
          }`}
          onClick={() => router.push("/employer/job")}
        >
          <BiNotepad size={36} />
        </button>
      ) : (
        <button
          className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white text-gray-400 rounded h-max${
            pathname.startsWith("/quest") ? " text-primary" : ""
          }`}
          onClick={() => router.push("/quest")}
        >
          <BiCalendarStar size={36} />
        </button>
      )}
      <div className={` flex flex-nowrap flex-col items-center cursor-pointer bg-white text-gray-400 rounded h-max`}>
        <BiCalendarStar size={36} />
      </div>
      <Link
        className={` absolute flex bottom-1 rounded-full bg-primary items-center justify-center cursor-pointer text-white btn btn-circle w-20 h-20${
          pathname.startsWith("/chatBoard") ? " text-primary" : ""
        }`}
        href={"/chatBoard"}
      >
        <BiChat className="" size={36} />
      </Link>

      <button
        className={` flex flex-nowrap flex-col items-center bg-white cursor-pointer text-gray-400 rounded h-max${
          !pathname.startsWith("/job/myJob") && pathname.startsWith("/job") ? " text-primary" : ""
        }`}
        onClick={() => router.push("/job")}
      >
        <BiSearch size={36} />
      </button>
      <button
        className={` flex flex-nowrap flex-col items-center bg-white cursor-pointer text-gray-400 rounded h-max${
          pathname.startsWith("/myPage") ? " text-primary" : ""
        }`}
        onClick={() => router.push("/myPage")}
      >
        <BiUser size={36} />
      </button>
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
export const EmployerLayout = ({ children }) => {
  const self = st.use.self();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const jobId = params.get("jobId");
  if (self.roles.includes("business")) {
  } else if (self.roles.includes("user") && !self.roles.includes("business")) {
    router.push("/job");
  } else router.push("/");
  return (
    <div className="w-full">
      <div className="w-full py-2 sticky top-0 z-50 bg-white flex items-center border-b border-white shadow ">
        {pathname.startsWith("/employer/job/new") ? (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/employer/job")} />
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">구인글 등록</div>
          </>
        ) : pathname.startsWith("/employer/job") ? (
          <>
            {pathname.startsWith("/employer/job/") && (
              <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/employer/job")} />
            )}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">내 구인글 목록</div>
            {jobId !== null && (
              <button
                className="btn mx-2 px-2 text-3xl"
                onClick={() => {
                  copyURL(`${env.origin}/job/${jobId}`);
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
            <LogoOutlined className="font-bold  flex-1 " width={40} />
          </>
        )}
        <button
          className="btn mx-2 px-2 text-3xl ml-auto"
          onClick={() => {
            if (jobId !== null) {
              router.refresh();
            } else if (pathname.startsWith("/employer/job")) {
              st.do.refreshJobinEmployer({ invalidate: true });
            } else {
              router.refresh();
            }
          }}
        >
          <BiRefresh className="text-white" />
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
  const jobId = useSearchParams().get("jobId");
  const gender = self.gender;
  return (
    <div className="w-full">
      <div className="w-full py-2 sticky top-0 z-50 bg-white flex items-center border-b border-white shadow ">
        {pathname.startsWith("/job/myJob") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">Job Space</div>
          </>
        ) : pathname.startsWith("/job/") ? (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} />
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">Job Detail</div>
            <button
              className="btn mx-2 px-2 text-3xl"
              onClick={() => {
                copyURL(`${env.origin}/job/${jobId}`);
                message.info({ content: "링크가 복사되었습니다" });
              }}
            >
              <AiOutlineLink />
            </button>
            {/* <LogoOutlined className="font-bold  flex-1 " width={80} /> */}
          </>
        ) : pathname.startsWith("/job") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">Job Space</div>
          </>
        ) : pathname.startsWith("/home") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">Home</div>
          </>
        ) : pathname.startsWith("/chatBoard") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">My Chat</div>
          </>
        ) : pathname.startsWith("/quest") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">Quest</div>
          </>
        ) : pathname.startsWith("/employer/job") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">My Post</div>
          </>
        ) : pathname.startsWith("/myPage/policy") ? (
          <>
            <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/myPage")} />
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">Policy</div>
          </>
        ) : pathname.startsWith("/myPage") ? (
          <>
            {/* <BiChevronLeft className="text-3xl text-primary font-bold" onClick={() => router.push("/job")} /> */}
            <div className="text-2xl font-medium text-gray-600 flex-1 ml-5">
              {self.roles.includes("business") ? "Job Info" : "My"}
            </div>
          </>
        ) : (
          <>{/* <LogoOutlined className="flex-1 font-bold " width={40} /> */}</>
        )}
        <button
          className="btn mx-2 px-2 text-3xl ml-auto"
          onClick={async () => {
            if (pathname.startsWith("/job/myJob")) {
              await st.do.refreshJobInApply({ invalidate: true });
              await st.do.refreshJobInReserve({ invalidate: true });
            } else if (jobId !== null) {
              router.refresh();
            } else if (pathname.startsWith("/job")) {
              await st.do.refreshJob({ invalidate: true });
            } else {
              router.refresh();
            }
          }}
        >
          <BiRefresh className="text-white" />
        </button>
        {/* {self.id ? (
          <button
            className="btn mx-2 px-2 text-3xl"
            onClick={() => {
              st.do.logout("/job");
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

  // if (self.roles.includes("business")) router.push("/employer");
  // else if (self.roles.includes("user")) router.push("/job");
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
