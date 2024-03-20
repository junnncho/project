import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";

interface ChatBoardItemIneSelfProps {
  className?: string;
  chatBoard: gql.LightChatBoard;
  slice?: slice.ChatBoardSlice;
}

export const ChatBoardItem = ({
  className,
  chatBoard,
  slice = st.slice.chatBoard,
  actions,
  columns,
}: ModelProps<slice.ChatBoardSlice, gql.LightChatBoard>) => {
  return (
    <DataItem
      className={className}
      // title={`${chatBoard.type}-${chatBoard.title}`}
      model={chatBoard}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};

{
  /* <Image alt={"."} src="/profileImgEx.png" height={40} width={40} />; */
}

const ChatBoardItemInSelf = ({ className, chatBoard, slice = st.slice.chatBoard }: ChatBoardItemIneSelfProps) => {
  const nowTime = dayjs();
  nowTime.format("YYYY-MM-DD HH:mm:ss.SSS");
  const chats = chatBoard.recentRoom.chats;
  const router = useRouter();

  return (
    <div
      className="flex justify-between w-full px-4 py-4 border-b bg-white rounded-xl shadow-md my-2 border-gray-200"
      onClick={() => router.push(`/chatBoard/${chatBoard.id}`)}
    >
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-16 mask mask-circle">
            <Image src="/profile.png" alt={""} width={100} height={100} />
          </div>
        </div>
        <div className="ml-5">
          <div className="text-lg font-bold mb-3">{chatBoard.name}</div>
          <div className="text-base">{chats.length === 0 ? "초대 되었습니다." : chats[chats.length - 1].text}</div>
        </div>
      </div>
      <div className="justify-center pt-2 text-xs">
        <div className="text-xs text-gray-400 ">
          {nowTime.isAfter(dayjs(chatBoard.updatedAt), "day")
            ? dayjs(chatBoard.updatedAt).format("M월 DD일")
            : dayjs(chatBoard.updatedAt).format("HH:mm")}
        </div>
        {chatBoard.recentRoom.unread && chatBoard.recentRoom.unread > 0 ? (
          <div className="w-full mt-1 text-center font-semibold text-white bg-red-400 rounded-full">
            {chatBoard.recentRoom.unread}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

ChatBoardItem.InSelf = ChatBoardItemInSelf;
