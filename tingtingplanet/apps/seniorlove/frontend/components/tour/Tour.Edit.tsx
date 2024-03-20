import { Editor, EmptyProfile, Field, message, Select } from "@shared/ui-web";
import { gql, slice, st } from "../../stores";
import Image from "next/image";
import dayjs from "dayjs";
import { useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { gql as social } from "@social/data-access";
import { latlngLocationMap, Utils } from "@shared/util";
import { BiTrash } from "react-icons/bi";

interface TourEditProps {
  tourId?: string | null;
  slice?: slice.TourSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const TourEdit = ({ slice = st.slice.tour, tourId = undefined }: TourEditProps) => {
  const tourForm = slice.use.tourForm();
  return (
    <>
      <div className="flex items-cente">
        {/* <p className="w-24 mt-3 text-center">{l("tour.field")}</p> */}
        {/* <Input value={tourForm.field} onChange={(e) => slice.do.setFieldOnTour(e.target.value)} /> */}
      </div>
    </>
  );
};

const TourEditInDriver = ({ slice = st.slice.tour, tourId = undefined }: TourEditProps) => {
  const tourForm = slice.use.tourForm();
  const self = st.use.self();
  const router = useRouter();
  const tourSubmit = slice.use.tourSubmit();
  const isTourSubmitable =
    !tourSubmit.disabled && (!tourForm.name || !tourForm.phone || !tourForm.dues || !(tourForm.departPlace.length < 1));
  const handleSubmit = async () => {
    if (!tourForm.name) return message.error("여행 제목을 입력해주세요!");
    if (!tourForm.phone) return message.error("문의번호를 입력해주세요!");
    if (!tourForm.dues) return message.error("회비를 입력해주세요!");
    if (!tourForm.departAt.isValid()) return message.error("출발시간을 올바르게 입력해주세요!");
    if (!tourForm.place) return message.error("여행 장소를 정확히 입력해주세요!");
    if (tourForm.departPlace.length < 1) return message.error("출발장소를 올바르게 입력해주세요!");
    if (tourForm.id === null || tourForm.id.length === 0) {
      const generateChatBoard = await social.generateChatBoard([self.id], tourForm.name);
      slice.do.setTourForm({ ...tourForm, chatBoard: generateChatBoard });
    }
    slice.do.setDepartPlaceOnTour(tourForm.departPlace.filter((place) => place[0] && place[1]));
    try {
      await slice.do.submitTour();
    } catch (e) {
      message.error({
        content: "시스템 오류입니다. 관리자에게 문의해주세요. 화면을 캡쳐해주시면 큰 도움이 됩니다" + e.message,
        duration: 10,
      });
    }
    router.push("/driver/tour");
  };
  useEffect(() => {
    console.log(tourForm.departPlace);

    console.log(slice.do.checkTourSubmitable());
  }, [tourForm]);
  if (!self.roles.includes("business") || (tourId && !(self.id === tourForm.driver?.id))) {
    router.push("/tour");
    return <div>허가되지않은페이지입니다</div>;
  }
  return (
    <div className="w-full px-2 pb-20">
      <div className="flex items-center w-full pl-4 my-4">
        <div className="mr-4 overflow-hidden border rounded-full border-primary h-10">
          {tourForm.driver?.image ? (
            <Image
              src={tourForm.driver.image.url}
              alt={"버스기사프사"}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <EmptyProfile width={40} />
          )}
        </div>
        <div className="mr-4 ">{tourForm.driver?.nickname} </div>
        <div className="text-gray-500 ">기사님</div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">여행제목</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border input border-primary"
            value={tourForm.name}
            onChange={(e) => slice.do.setNameOnTour(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">출발시간</div>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          className="border input border-primary w-fulll focus:outline-none"
          value={tourForm.departAt.format("YYYY-MM-DD")}
          onChange={(e) => slice.do.setDepartAtOnTour(dayjs(e.target.value))}
        />
      </div>
      <input
        type="time"
        placeholder="HH-mm"
        className="mb-4 ml-24 border input border-primary w-fulll focus:outline-none"
        value={tourForm.departAt.format("HH:mm")}
        onChange={(e) => {
          {
            // console.log(dayjs(e.target.valueAsDate?.toLocaleDateString()).hour(), e.target.valueAsDate);
            slice.do.setDepartAtOnTour(
              tourForm.departAt
                .set("hour", dayjs(e.target.valueAsDate).hour() - 9)
                .set("minute", dayjs(e.target.valueAsDate).minute())
            );
          }
        }}
      />
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">문의번호</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border input border-primary "
            value={tourForm.phone}
            onChange={(e) => slice.do.setPhoneOnTour(Utils.formatPhone(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">회비</div>
        <div className="flex items-center flex-1">
          <input
            type="number"
            className="w-full border input border-primary "
            value={tourForm.dues}
            onChange={(e) => slice.do.setDuesOnTour(e.target.valueAsNumber)}
          />
          <div className="absolute right-8">원</div>
        </div>
      </div>
      <div className="flex w-full py-2">
        <div className="w-24 flex flex-wrap min-w-24 justify-center mt-8">출발지역</div>
        <div className="flex flex-wrap gap-2 flex-1 ">
          {tourForm.departPlace.map((departPlace, idx) => (
            <div
              key={idx + departPlace[0] + departPlace[1]}
              className="flex flex-wrap px-2 w-min items-center self-start py-4 gap-4 border border-primary rounded-lg pb-2"
            >
              <div className="ml-4 text-primary">{idx + 1}차 탑승지역</div>
              <div className="flex items-center">
                <div className=" w-20 text-center">시/도</div>
                <Select
                  // key={idx}
                  defaultValue={departPlace[0]}
                  value={departPlace ? departPlace[0] : "시/도"}
                  selectClassName=" input input-bordered duration-300 focus:outline-none placeholder:text-gray-200"
                  onChange={(city) => {
                    slice.do.writeOnTour(`departPlace[${idx}]`, [city.toString(), "상세지역"]);
                  }}
                >
                  {Object.keys(latlngLocationMap).map((key) => (
                    <Select.Option key={key} value={key}>
                      {key}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="flex items-center ">
                <div className=" w-20 text-center">상세지역</div>
                <Select
                  // key={idx}
                  defaultValue={departPlace[1]}
                  selectClassName=" input input-bordered duration-300 focus:outline-none placeholder:text-gray-200"
                  value={departPlace ? departPlace[1] : "상세지역"}
                  onChange={(district) =>
                    slice.do.writeOnTour(`departPlace[${idx}]`, [departPlace[0], district.toString()])
                  }
                >
                  {departPlace[0] ? (
                    latlngLocationMap[departPlace[0]].map((value) => (
                      <Select.Option key={value.district} value={value.district}>
                        {value.district}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option key={0} value={0}>
                      상세지역
                    </Select.Option>
                  )}
                </Select>
              </div>
              <button
                className=" btn btn-error w-full"
                onClick={() => {
                  console.log();
                  const arr = tourForm.departPlace.filter((_, index) => idx !== index);
                  console.log(arr);
                  slice.do.setDepartPlaceOnTour(arr);
                }}
              >
                <BiTrash size={30} />
              </button>
            </div>
          ))}
          <button
            className="btn btn-primary text-white p-1 mr-2 my-2 px-2"
            onClick={() => {
              slice.do.setDepartPlaceOnTour([...tourForm.departPlace, ["", ""]]);
            }}
          >
            + 경유지 추가
          </button>
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">여행장소</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border input border-primary "
            value={tourForm.place}
            onChange={(e) => slice.do.setPlaceOnTour(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="text-center w-24">남녀 구분</div>
        <input
          type="checkbox"
          className="accent-primary w-5 h-5"
          checked={tourForm.distinctGender}
          onChange={(e) => slice.do.setDistinctGenderOnTour(e.target.checked)}
        />
      </div>
      {tourForm.distinctGender ? (
        <>
          {" "}
          <div className="flex items-center w-full py-2">
            <div className="w-24 text-center">남성 모집인원</div>
            <div className="absolute right-8">명</div>
            <div className="flex items-center flex-1">
              <input
                type="number"
                className="w-full border input border-primary "
                value={tourForm.maxMaleReserver}
                onChange={(e) => slice.do.setMaxMaleReserverOnTour(e.target.valueAsNumber)}
              />
            </div>
          </div>
          <div className="flex items-center w-full py-2">
            <div className="w-24 text-center">여성 모집인원</div>
            <div className="absolute right-8">명</div>
            <div className="flex items-center flex-1">
              <input
                type="number"
                className="w-full border input border-primary "
                value={tourForm.maxFemaleReserver}
                onChange={(e) => slice.do.setMaxFemaleReserverOnTour(e.target.valueAsNumber)}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center w-full py-2">
          <div className="w-24 text-center">모집인원</div>
          <div className="absolute right-8">명</div>
          <div className="flex items-center flex-1">
            <input
              type="number"
              className="w-full border input border-primary "
              value={tourForm.maxMaleReserver}
              onChange={(e) => slice.do.setMaxMaleReserverOnTour(e.target.valueAsNumber)}
            />
          </div>
        </div>
      )}

      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">행사 사진</div>
        <div className="flex items-center flex-1">
          <div className="">
            <Field.Imgs
              label=""
              files={tourForm.thumbnails}
              onUpdate={slice.do.setThumbnailsOnTour}
              addFiles={slice.do.uploadThumbnailsOnTour}
            />
          </div>
        </div>
      </div>
      <div className=" w-full py-2">
        <div className="w-24 text-center py-2">안내사항</div>
        <div className="flex items-center flex-1">
          <div className=" px-2 w-full">
            <Editor
              addFile={slice.do.addContentFilesOnTour}
              onChange={slice.do.setContentOnTour}
              addFilesGql={gql.addTourFiles}
              defaultValue={tourForm.content}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div>submitable in tingting{!tourSubmit.disabled}</div>
        <button className="gap-2 mr-2 btn btn-primary text-white" disabled={!isTourSubmitable} onClick={handleSubmit}>
          <AiOutlineSend />
          저장
        </button>
        <button className="border-dashed btn btn-outline" onClick={() => router.back()}>
          취소
        </button>
      </div>
    </div>
  );
};
TourEdit.InDriver = TourEditInDriver;
