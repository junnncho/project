import { ChatBoard } from "@social/ui-web";
import { st } from "@localjobs/frontend/stores";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Modal, Skeleton } from "@shared/ui-web";
import Image from "next/image";
import dayjs from "dayjs";

export default function ChatBoardId() {
  const chatBoardId = useSearchParams().get("chatBoardId") as string;
  const chatBoard = st.use.chatBoard();
  const jobId = useSearchParams().get("jobId") as string;
  const router = useRouter();
  const self = st.use.self();
  const user = st.use.user();
  const [userModal, setUserModal] = useState<boolean>(false);

  useEffect(() => {
    st.do.viewChatBoard(chatBoardId);
    st.do.setChatRoomListInChatBoard([]);
  }, [chatBoardId]);

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, [chatBoard]);

  return (
    <div className="w-full h-screen">
      <Modal open={userModal} onCancel={() => setUserModal(false)} footer={null} className="m-4">
        {user === "loading" ? (
          <Skeleton />
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center mb-5">
              <Image
                src={user.image?.url ?? "/localjobs_logo.png"}
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
      <button className="btn btn-ghost fixed z-50 left-0 top-0" onClick={() => router.push(`/employer/job/${jobId}`)}>
        <AiOutlineArrowLeft />
      </button>
      {chatBoard === "loading" ? (
        "loading"
      ) : (
        <ChatBoard.View.InSelf
          chatBoard={chatBoard}
          selfId={self.id}
          onProfile={async (userId) => {
            await st.do.viewUser(userId);
            setUserModal(true);
          }}
        />
      )}
    </div>
  );
}
