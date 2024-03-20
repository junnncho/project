import { BiChevronLeft } from "react-icons/bi";
import { ChatBoard, ChatRoom } from "..";
import { RecentTime } from "@shared/ui-web";
import { gql, slice, st, usePage } from "@social/data-access";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Utils } from "@shared/util";
import { useInterval } from "@shared/util-client";

interface ChatBoardViewProps {
  className?: string;
  chatBoard: gql.ChatBoard;
  slice?: slice.ChatBoardSlice;
  userId?: string;
  selfId: string;
  onProfile?: (userId: string) => void;
}
// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const ChatBoardView = ({ className, chatBoard, slice = st.slice.chatBoard }: ChatBoardViewProps) => {
  return (
    <div className={twMerge(className, ``)}>
      <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
        <h3>{/* {l("chatBoard.id")}-{chatBoard.id} */}</h3>
      </div>
      <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
        <div>{chatBoard.status}</div>
        <RecentTime
          date={chatBoard.createdAt}
          breakUnit="second"
          timeOption={{ dateStyle: "short", timeStyle: "short" }}
        />
      </div>
    </div>
  );
};

const ChatBoardViewInSelf = ({
  className,
  chatBoard,
  slice = st.slice.chatBoard,
  userId = "default",
  onProfile,
  selfId,
}: ChatBoardViewProps) => {
  const router = useRouter();
  const scrollContainerRef = useRef<any>();
  const chatRoomListInChatBoard = st.use.chatRoomListInChatBoard();
  let isLoading = false;
  useInterval(() => {
    loadHandler();
  }, 1000);

  useEffect(() => {
    scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [chatBoard]);

  const loadHandler = async () => {
    if (isLoading) return;
    if (scrollContainerRef.current.scrollTop > 0) return;
    isLoading = true;
    const prevHeight = scrollContainerRef.current.scrollHeight;
    const lastRoom =
      chatRoomListInChatBoard === "loading" || chatRoomListInChatBoard.length === 0
        ? chatBoard.recentRoom
        : chatRoomListInChatBoard[0];
    if (!lastRoom) return;
    if (!lastRoom.prevChat) return;
    await st.do.loadChatRoomsInChatBoard(lastRoom.prevChat, 3);
    const newHeight = scrollContainerRef.current.scrollHeight - prevHeight;
    scrollContainerRef.current.scrollTop = newHeight;
    await Utils.sleep(1000);
    isLoading = false;
  };

  return (
    <div className="h-screen bg-gray-200 pt-12">
      <div className="fixed top-0 z-40 flex items-center justify-center w-full h-12 text-center bg-white border-b shadow-sm border-white">
        <div className="font-bold text-xl text-left">{chatBoard.name}</div>
      </div>
      <div className="pb-16 h-[calc(100vh-3rem)] overflow-scroll" ref={scrollContainerRef}>
        {chatRoomListInChatBoard !== "loading" && (
          <ChatRoom.List.InChatBoard
            chatRoomList={[...chatRoomListInChatBoard, chatBoard.recentRoom]}
            selfId={selfId}
            onProfile={onProfile}
          />
        )}
      </div>
      <div className="fixed bottom-0 flex justify-center w-full ">
        <ChatBoard.Action.SendChat slice={slice} />
      </div>
    </div>
  );
};

ChatBoardView.InSelf = ChatBoardViewInSelf;
