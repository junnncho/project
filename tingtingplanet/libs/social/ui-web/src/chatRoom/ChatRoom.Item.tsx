import { Chat } from "..";
import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import dayjs from "dayjs";

export const ChatRoomItem = ({
  className,
  chatRoom,
  slice = st.slice.chatRoom,
  actions,
  columns,
}: ModelProps<slice.ChatRoomSlice, gql.LightChatRoom>) => {
  return (
    <DataItem
      className={className}
      title={`${chatRoom.id}`}
      model={chatRoom}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};

const ChatRoomItemInChatBoard = ({
  chatRoom,
  className,
  slice = st.slice.chatRoom,
  userId,
  onProfile,
  selfId,
}: {
  chatRoom: gql.LightChatRoom | gql.ChatRoom;
  className?: string;
  slice?: slice.ChatRoomSlice;
  userId: string;
  onProfile?: (userId: string) => void;
  selfId: string;
}) => {
  return (
    <div className="w-full " key={chatRoom.roomNum + chatRoom.root}>
      {chatRoom.chats.map((chat, idx) => {
        if (typeof chat.from === undefined) return <>error!</>;
        const noPrev =
          chatRoom.chats.length === 0 ||
          chatRoom.chats[idx - 1]?.from !== chat.from ||
          dayjs(chat.at).diff(chatRoom.chats[idx - 1]?.at, "m") > 5;
        const noNext =
          idx + 1 === chatRoom.chats.length ||
          chatRoom.chats[idx + 1]?.from !== chat.from ||
          dayjs(chatRoom.chats[idx + 1]?.at).diff(chat.at, "m") > 5;
        return chat.from === selfId ? (
          <div className="chat py-[2px] my-0 chat-end">
            {noPrev ? (
              noNext ? (
                <Chat.Item.SelfNormal chat={chat} />
              ) : (
                <Chat.Item.SelfTop chat={chat} />
              )
            ) : noNext ? (
              <Chat.Item.SelfBottom chat={chat} />
            ) : (
              <Chat.Item.SelfMiddle chat={chat} />
            )}
          </div>
        ) : (
          <div className="chat py-[2px] chat-start">
            {noPrev ? (
              noNext ? (
                <Chat.Item.Normal
                  chat={chat}
                  from={chatRoom.users.find((user) => user.id === chat.from) as gql.User}
                  onProfile={onProfile}
                />
              ) : (
                <Chat.Item.Top
                  chat={chat}
                  from={chatRoom.users.find((user) => user.id === chat.from) as gql.User}
                  onProfile={onProfile}
                />
              )
            ) : noNext ? (
              <Chat.Item.Bottom chat={chat} />
            ) : (
              <Chat.Item.Middle chat={chat} />
            )}
          </div>
        );
      })}
    </div>
  );
};
ChatRoomItem.InChatBoard = ChatRoomItemInChatBoard;

// dayjs(chat.at).diff(chatRoom.chats[idx - 1]?.at, "m") < 1 &&
// chat.from === chatRoom.chats[idx - 1]?.from ? (
//   chat.from === chatRoom.chats[idx + 1]?.from ? (
//     <Chat.Item.SelfMiddle chat={chat} />
//   ) : (
//     <Chat.Item.SelfBottom chat={chat} />
//   )
// ) : chat.from !== chatRoom.chats[idx + 1]?.from ? (
//   <Chat.Item.SelfNormal chat={chat} />
// ) : (
//   <Chat.Item.SelfTop chat={chat} />
// )

// {chatRoom.chats[idx - 1] === undefined ? (
//   "예외"
// ) : dayjs(chat.at).diff(chatRoom.chats[idx - 1]?.at, "m") < 1 &&
//   chat.from === chatRoom.chats[idx - 1]?.from ? (
//   chat.from === chatRoom.chats[idx + 1]?.from ? (
//     <Chat.Item.Middle chat={chat} />
//   ) : (
//     <Chat.Item.Bottom chat={chat} />
//   )
// ) : chat.from !== chatRoom.chats[idx + 1]?.from ? (
//   <Chat.Item.Normal chat={chat} from={chatRoom.users.find((user) => user.id === chat.from)} />
// ) : (
//   <Chat.Item.Top chat={chat} from={chatRoom.users.find((user) => user.id === chat.from)} />
// )}
