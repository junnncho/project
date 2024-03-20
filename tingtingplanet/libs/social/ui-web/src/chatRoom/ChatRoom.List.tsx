import * as ChatRoom from ".";
import { Chat } from "..";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps, client } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useEffect } from "react";

export const ChatRoomList = ({ slice = st.slice.chatRoom, init }: ModelsProps<slice.ChatRoomSlice, gql.ChatRoom>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={ChatRoom.Item}
      renderDashboard={ChatRoom.Stat}
      queryMap={gql.chatRoomQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(chatRoom: DefaultOf<gql.ChatRoom>) => `${chatRoom.id}`}>
          <ChatRoom.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["type", "status", "createdAt"]}
      actions={(chatRoom: gql.LightChatRoom, idx) => [
        "remove",
        "edit",
        // { type: "approve", render: () => <ChatRoom.Action.Approve chatRoom={chatRoom} idx={idx} slice={slice} /> },
      ]}
    />
  );
};
export const ChatRoomLogs = () => {
  const chatLogs = st.use.chatLogs();
  useEffect(() => {
    client.socket?.on("chat:public", (data) => {
      st.do.addChatLogs(data);
    });
    return () => {
      client.socket?.off("chat:public");
    };
  }, []);
  return (
    <div className="relative items-end backdrop-blur-md border-[3px] overflow-hidden flex-wrap border-solid rounded-md overlfow-hidden h-[200px] w-[400px] ">
      <div className="absolute bottom-0 left-0 p-2">
        {chatLogs.map((chatLog, index) => (
          <div className="text-white text-[18px]" key={index}>
            {chatLog.nickname && chatLog.text && `[${chatLog.nickname}]:${chatLog.text}`}
          </div>
        ))}
      </div>
    </div>
  );
};

ChatRoomList.Logs = ChatRoomLogs;

const ChatRoomListInChatBoard = ({
  chatRoomList,
  slice = st.slice.chatRoomInChatBoard,
  userId = "default",
  selfId,
  onProfile,
}: {
  chatRoomList: gql.LightChatRoom[];
  slice?: slice.ChatRoomSlice;
  userId?: string;
  selfId: string;
  onProfile?: (userId: string) => void;
}) => {
  console.log(chatRoomList);
  let userBuffer: gql.shared.LightUser[] | gql.shared.User[] = [];
  return (
    <>
      {chatRoomList.map((chatRoom, index) => {
        const exitList = userBuffer.filter(
          (user) => chatRoom.users.filter((_user) => _user.id === user.id).length === 0
        );
        const joinList = chatRoom.users.filter(
          (user) => userBuffer.filter((_user) => _user.id === user.id).length === 0
        );
        userBuffer = chatRoom.users;
        console.log(userBuffer);
        return (
          <div key={chatRoom.id} className="">
            {exitList.length > 0 && (
              <Chat.Item.Exit nickNames={exitList.map((user) => user.nickname)} key={index + chatRoom.id + "exit"} />
            )}
            {(chatRoom.roomNum === 0 || index !== 0) && joinList.length > 0 && (
              <Chat.Item.Join nickNames={joinList.map((user) => user.nickname)} key={index + chatRoom.id + "join"} />
            )}
            <ChatRoom.Item.InChatBoard
              chatRoom={chatRoom}
              slice={slice}
              userId={userId}
              selfId={selfId}
              onProfile={onProfile}
            />
          </div>
        );
      })}
    </>
  );
};
ChatRoomList.InChatBoard = ChatRoomListInChatBoard;
