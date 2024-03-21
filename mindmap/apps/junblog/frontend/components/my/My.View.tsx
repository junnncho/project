import Image from "next/image";
// import { MyList } from "./My.List";
// import { MyItem } from "./My.Item";
import { useMeStore } from "@junblog/frontend/stores/client";

export const MyView = ({ className }: { className?: string }) => {
  const setEvent = useMeStore((state) => state.setEvent);
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setEvent("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      setEvent("복사에 실패하였습니다.");
    }
  };
  const user = useMeStore();
  return (
    <div className="pb-20 pt-10 text-xl flex flex-col items-center">
      {/* <div className="font-bold">내 프로필</div> */}
      <div className=" border-custom rounded-md p-4 w-fit px-8 mb-5">
        <div className="flex">
          <Image
            src={user.image || "/icon.png"}
            width={100}
            height={100}
            className="bg-white object-cover border-2 border-black rounded-md"
            alt="profile"
          />
          <div className="ml-5">
            <div className="font-bold text-3xl">{user.nickname}</div>
            <div className=" text-zinc-500 text-lg">{user.email}</div>
            <div>
              <span>잔액</span>
              <span className="text-custom2 ml-5">{user.point} SOL</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex">
            <div className="pr-5">출금 지갑</div>
            <div
              className="flex-grow text-custom self-center text-sm btn-hover min-w-[200px]"
              onClick={() => user.myWallet && copyToClipboard(user.myWallet)}
            >
              {user.myWallet || "아직 등록되지 않았습니다"}
            </div>
          </div>
          <div className="flex mt-2">
            <div className="pr-5">입금 지갑</div>
            <div
              className="flex-grow text-custom self-center text-sm btn-hover min-w-[200px]"
              onClick={() => user.gameWallet && copyToClipboard(user.gameWallet)}
            >
              {user.gameWallet}
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            className="text-custom2 mt-3 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base"
            onClick={() => user.setModal("withdraw")}
          >
            출금하기
          </button>
          <button
            className="text-custom2 mt-3 ml-2 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base"
            onClick={() => user.setModal("edit")}
          >
            출금지갑등록
          </button>

          <button
            className="ml-auto text-custom2 mt-3 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base"
            onClick={() => user.setModal("deposit")}
          >
            입금하기
          </button>
        </div>
      </div>
      {/* <div className="flex w-full">
        <div className="w-1/2 mx-5">
          <div className="font-bold mb-2">활동 내역</div>
          <MyList.Activity />
        </div>
        <div className="w-1/2 mx-5">
          <div className="font-bold mb-2">입출금 내역</div>
          <MyList.Receipt />
        </div>
      </div> */}
      {/* <Contract.Item.Modal /> */}
      {/* <MyItem.Modal /> */}
    </div>
  );
};
