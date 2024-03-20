import { Action } from ".";
import { BiFemale, BiMale } from "react-icons/bi";
import { Tour } from "..";
import { UserApplyItem, parsePhone } from "../Common";
import { Utils } from "@shared/util";
import { customStore } from "@seniorlove/frontend/stores/store";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { AiFillCloseCircle } from "react-icons/ai";
import { Modal, Skeleton } from "@shared/ui-web";

const calcAge = (ages: number[]) => {
  if (ages.length === 0) return 0;
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  return Math.floor(average(ages));
};

interface TourViewProps {
  className?: string;
  tour: gql.Tour;
  slice?: slice.TourSlice;
  onChat?: () => void;
}
// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const TourView = ({ className, tour, slice = st.slice.tour, onChat }: TourViewProps) => {
  const self = st.use.self();
  const store = customStore();
  const isApply =
    tour.maleApplicants.some((user) => user.id === self.id) ||
    tour.femaleApplicants.some((user) => user.id === self.id);
  const isReserve =
    tour.maleReservers.some((user) => user.id === self.id) || tour.femaleReservers.some((user) => user.id === self.id);
  const isDriver = tour.driver.id === self.id;
  const [applyView, setApplyView] = useState<boolean>(true);
  const [reserveView, setReserveView] = useState<boolean>(true);

  return (
    <>
      <div className="sticky top-20 left-0 px-4 z-50 w-full">
        {isApply
          ? applyView && (
              <>
                <AiFillCloseCircle
                  size={20}
                  className="absolute top-2 right-6"
                  opacity={0.6}
                  onClick={() => setApplyView(false)}
                />
                <div className=" alert alert-success gap-0 mb-4">
                  <div>예약상태: 접수완료 </div>
                  <div className="text-sm mt-0"> 주선자가 접수를 승인하면 예약이 완료됩니다.</div>
                </div>
              </>
            )
          : isReserve
          ? reserveView && (
              <>
                <AiFillCloseCircle
                  size={20}
                  className="absolute top-2 right-6"
                  opacity={0.6}
                  onClick={() => setReserveView(false)}
                />
                <div className=" alert alert-info gap-0 mb-4">
                  <div>예약상태: 예약확정</div>
                  <div className="text-sm mt-0"> 만남장소와 시간을 확인해주세요!</div>
                </div>
              </>
            )
          : null}
      </div>
      <div className="w-full h-[30vh] relative mb-4">
        <Image
          src={
            tour.thumbnails && Array.isArray(tour.thumbnails) && tour.thumbnails[0]
              ? tour.thumbnails[0]?.url
              : "/neverAsk.png"
          }
          fill
          alt="asdf"
          className="object-cover"
        />
      </div>
      <div className="pb-2 text-2xl flex flex-wrap justify-between items-center">
        {tour.name}
        {tour.chatBoard && (isReserve || isDriver) && (
          <button className="btn text-xl" onClick={onChat}>
            채팅방
          </button>
        )}
      </div>
      <div className="flex flex-wrap w-full py-1">
        {/* <div className="mr-6">{tour.departAt.format("MM / DD  HH:mm 출발")}</div> */}
        <div className="py-2 w-full border-opacity-40 flex border-2 border-primary rounded-lg">
          <Image
            alt="thmb"
            src={tour.driver.image?.url ? tour.driver.image.url : "/seniorlove_logo.png"}
            width={100}
            height={100}
            className="self-center ml-2 object-cover rounded-lg"
          />
          <div className="w-full">
            <div className="w-full mt-1">
              {/* <div className="flex justify-around py-1 text-base"> */}
              <div className="ml-2">
                주관자이름: <span className="font-bold ml-1">{tour.driver.nickname}</span>
              </div>
              <div className="ml-2">
                번호:{" "}
                <span>
                  <label
                    htmlFor="my-modal-4"
                    onClick={() => {
                      store.setPhone(tour.phone);
                    }}
                    className="underline font-bold"
                  >
                    {parsePhone(tour.phone)}
                  </label>
                </span>
              </div>
              <div className="ml-2">
                나이: <span className="font-bold ml-1">{Utils.getAge(tour.driver.dateOfBirth)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-1">
        출발날짜: {tour.departAt.format("YYYY년 MM월 DD일 ")}
        {weekDay[tour.departAt.day()]}요일
      </div>
      <div className="py-1">출발시간 : {tour.departAt.format("HH시 mm분")}</div>
      <div className="py-1 flex ">
        <div className="flex flex-wrap">출발지역:</div>
        <div className="flex flex-wrap gap-1 self-center ml-1 flex-1 py-1">
          {tour.departPlace.map((departPlace) => (
            <div
              className="font-bold badge text-base py-1 text-white badge-primary"
              key={departPlace[0] + departPlace[1]}
            >
              {departPlace[0] + " " + departPlace[1]}
            </div>
          ))}
        </div>
      </div>
      <div className="py-1">목적지: {tour.place}</div>
      <div className="py-1">일일회비 : {tour.dues.toLocaleString()}원</div>
      <div className="flex items-center text-base">
        <div className="text-base text-gray-500 font-semibold">
          평균연령:{" "}
          {calcAge([...tour.maleReservers, ...tour.femaleReservers].map((user) => Utils.getAge(user.dateOfBirth)))}
        </div>
        {/* <div className="ml-auto flex">
          <div className="mx-1">
            <BiMale className="font-bold text-2xl text-blue-500 inline" />
            <span className="">
              {tour.totalMaleReserver}/{tour.maxMaleReserver}
            </span>
          </div>

          <div className="mx-1">
            <BiFemale className="font-bold text-2xl text-red-500 inline" />
            <span className="">
              {tour.totalFemaleReserver}/{tour.maxFemaleReserver}
            </span>
          </div>
          <div className="text-base mx-1 font-bold text-gray-500">{"(현재/총원)"}</div>
        </div> */}
      </div>
      <div className="py-1 text-xl font-bold">안내문</div>
      <div className="p-2 mt-1 border border-gray-300 rounded-md " dangerouslySetInnerHTML={{ __html: tour.content }} />
    </>
  );
};

const weekDay: string[] = ["월", "화", "수", "목", "금", "토", "일"];
const TourViewInSelf = ({ className, tour, slice = st.slice.tour }: TourViewProps) => {
  const self = st.use.self();
  const router = useRouter();
  return (
    <div className="p-4 text-lg pb-64">
      <TourView
        className={className}
        tour={tour}
        slice={slice}
        onChat={() => {
          router.push(`/tour/${tour.id}/${tour.chatBoard}`);
        }}
      />
      <div className=" fixed flex justify-around w-full bottom-0 left-0 pb-24 pt-2 border-t rounded-t-3xl border-primary backdrop-blur">
        {tour.femaleApplicants.some((user) => user.id === self.id) ||
        tour.maleApplicants.some((user) => user.id === self.id) ||
        tour.maleReservers.some((user) => user.id === self.id) ||
        tour.femaleReservers.some((user) => user.id === self.id) ? (
          <Tour.Action.UnReserve id={self.id} tour={tour} className="btn text-xl w-1/3 my-2 btn-neutral" />
        ) : (
          <Tour.Action.Apply
            disabled={
              tour.femaleApplicants.some((user) => user.id === self.id) ||
              tour.maleApplicants.some((user) => user.id === self.id) ||
              tour.maleReservers.some((user) => user.id === self.id) ||
              tour.femaleReservers.some((user) => user.id === self.id)
            }
            tour={tour}
            className="btn text-xl w-1/3 my-2 btn-neutral"
          />
        )}
        <Action.Inquiry tour={tour} className="btn text-xl w-1/3 my-2 btn-neutral" />
      </div>
    </div>
  );
};
TourView.InSelf = TourViewInSelf;

const TourViewInDriver = ({ className, tour, slice = st.slice.tour }: TourViewProps) => {
  const router = useRouter();
  const [cost, setCost] = useState<number>(0);
  const self = st.use.self();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isReserver, setIsReserver] = useState<"reserver" | "applicant">("applicant");
  const isDriver = tour.driver.id === self.id;
  const user = st.use.user();
  const [userModal, setUserModal] = useState<boolean>(false);

  useEffect(() => {
    if (!(tour.driver.id === self.id) || !self.roles.includes("business")) {
      router.push(`/tour/${tour.id}`);
    }
  }, [tour]);
  if (!(tour.driver.id === self.id) || !self.roles.includes("business")) return <div> 허가되지않은 페이지입니다 </div>;

  return (
    <div className="p-4 text-lg pb-64">
      <Modal open={userModal} onCancel={() => setUserModal(false)} footer={null} className="m-4">
        {user === "loading" ? (
          <Skeleton />
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center mb-5">
              <Image
                src={user.image?.url ?? "/seniorlove_logo.png"}
                width={190}
                height={190}
                className="object-cover border-2 border-primary rounded-lg"
                alt="profile"
              />
            </div>
            <div className="w-full flex flex-row border-y border-secondary py-4 font-semibold text-xl">
              <span className="ml-2">닉네임</span>
              <span className="ml-auto mr-2">{user.nickname}</span>
            </div>
            <div className="w-full flex flex-row border-b border-secondary py-4 font-semibold text-xl">
              <span className="ml-2">전화번호</span>
              <span className="ml-auto mr-2">{user.phone}</span>
            </div>
            <div className="w-full flex flex-row border-b border-secondary py-4 font-semibold text-xl">
              <span className="ml-2">성별</span>
              <span className="ml-auto mr-2">{user.gender === "female" ? "여성" : "남성"}</span>
            </div>
            <div className="w-full flex flex-row border-b border-secondary py-4 font-semibold text-xl">
              <span className="ml-2">나이</span>
              <span className="ml-auto mr-2">{dayjs().year() - user.dateOfBirth.year() + 1}</span>
            </div>
          </div>
        )}
      </Modal>
      <TourView
        className={className}
        tour={tour}
        slice={slice}
        onChat={() => {
          router.push(`/driver/tour/${tour.id}/${tour.chatBoard}`);
        }}
      />
      <div className="text-xl">
        <div className="flex items-end justify-between w-full pt-4 mt-10 border-t border-secondary">
          <div>여행내용</div>
          <button
            className="text-base text-gray-500 underline bg-inherit"
            onClick={() => router.push(`/driver/tour/${tour.id}/edit`)}
          >
            수정하기
          </button>
        </div>
      </div>
      <div className="p-2 mt-4 border border-gray-300 rounded-md ">
        <div className="flex">
          <div className="flex flex-wrap">출발지역:</div>
          <div className="flex flex-wrap gap-1 self-center ml-1 flex-1 py-1">
            {tour.departPlace.map((departPlace) => (
              <div className="font-bold badge text-base py-1 text-white badge-primary">
                {departPlace[0] + " " + departPlace[1]}
              </div>
            ))}
          </div>
        </div>
        <div className="">목적지: {tour.place}</div>
        <div className="">
          출발날짜: {tour.departAt.format("YYYY년 MM월 DD일 ")}
          {weekDay[tour.departAt.day()]}요일
        </div>
        <div className="">출발시간: {tour.departAt.format("HH시 mm분")}</div>
        <div className="">일일회비: {tour.dues.toLocaleString()}원</div>
      </div>

      <div className="text-xl">
        <div className="flex items-end justify-between w-full pt-4 mt-10 border-t border-secondary">
          <div>기대수익</div>
        </div>
        <div className="p-2 py-8 mt-4 border border-gray-300 rounded-md ">
          <div className="flex items-center w-full my-4">
            <div className="w-24 text-base">지출(만원): </div>
            <input
              type="number"
              value={cost}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="지출을 입력하세요"
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </div>
          <div className="my-2">
            현재 총 예상 매출
            <div>
              {((tour.totalFemaleReserver + tour.totalMaleReserver) * tour.dues).toLocaleString()} 원 /
              {((tour.maxFemaleReserver + tour.maxMaleReserver) * tour.dues).toLocaleString()} 원
            </div>
          </div>

          <div className="my-2">
            현재 총 예상 순이익 :
            <div>
              {((tour.totalFemaleReserver + tour.totalMaleReserver) * tour.dues - cost * 10000).toLocaleString()} 원 /
              {((tour.maxFemaleReserver + tour.maxMaleReserver) * tour.dues - cost * 10000).toLocaleString()} 원
            </div>
          </div>
        </div>
      </div>

      <div className="text-xl">
        <div className="flex items-end justify-between w-full pt-4 mt-10 border-t border-secondary">
          <div>예약 신청내역</div>
          <div className="flex items-center justify-center ">
            <button
              className={`btn m-0 h-8 min-h-min ${
                gender === "male" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setGender("male");
                // st.do.setDateOfBirthOnUser(dayjs());
              }}
            >
              남 ♂
            </button>
            <button
              className={`btn m-0 h-8 min-h-min ${
                gender === "female" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setGender("female");
                // st.do.setDateOfBirthOnUser(dayjs());
              }}
            >
              여 ♀
            </button>
          </div>
        </div>
        <div className="p-2 pb-8 mt-4 border border-gray-300 rounded-md ">
          <div className="flex justify-around py-1 text-lg">
            <div>현재 / 총원</div>
            <div>
              남:{" "}
              <span className="font-bold">
                {tour.totalMaleReserver}/{tour.maxMaleReserver}
              </span>
            </div>
            <div>
              여:{" "}
              <span className="font-bold">
                {tour.totalFemaleReserver}/{tour.maxFemaleReserver}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center my-4 ">
            <button
              className={`btn m-0 h-8 min-h-min ${
                isReserver === "applicant" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setIsReserver("applicant");
              }}
            >
              승인대기
            </button>
            <button
              className={`btn m-0 h-8 min-h-min ${
                isReserver === "reserver" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setIsReserver("reserver");
              }}
            >
              승인완료
            </button>
          </div>
          {gender === "male" ? (
            isReserver === "reserver" ? (
              <>
                {tour.maleReservers.map((user, idx) => (
                  <div className="flex my-2 items-center">
                    <UserApplyItem
                      user={user}
                      onClick={async () => {
                        await st.do.viewUser(user.id);
                        setUserModal(true);
                      }}
                    />
                    <Action.UnReserve id={user.id} tour={tour} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {tour.maleApplicants.map((user, idx) => (
                  <div className="flex my-2 items-center">
                    <UserApplyItem
                      user={user}
                      onClick={async () => {
                        await st.do.viewUser(user.id);
                        setUserModal(true);
                      }}
                    />
                    <Action.Reserve id={user.id} tour={tour} gender="male" />
                    <div className="mx-1" />
                    <Action.UnReserve id={user.id} tour={tour} />
                  </div>
                ))}
              </>
            )
          ) : isReserver === "reserver" ? (
            <>
              {tour.femaleReservers.map((user, idx) => (
                <div className="flex my-2 items-center">
                  <UserApplyItem
                    user={user}
                    onClick={async () => {
                      await st.do.viewUser(user.id);
                      setUserModal(true);
                    }}
                  />
                  <Action.UnReserve id={user.id} tour={tour} />
                </div>
              ))}
            </>
          ) : (
            <>
              {tour.femaleApplicants.map((user, idx) => (
                <div className="flex my-2 items-center">
                  <UserApplyItem
                    user={user}
                    onClick={async () => {
                      await st.do.viewUser(user.id);
                      setUserModal(true);
                    }}
                  />
                  <Action.Reserve id={user.id} tour={tour} gender="female" /> <div className="mx-1" />
                  <Action.UnReserve id={user.id} tour={tour} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
TourView.InDriver = TourViewInDriver;
