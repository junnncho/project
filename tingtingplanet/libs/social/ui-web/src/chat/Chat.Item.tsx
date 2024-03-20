import { EmptyProfile } from "@shared/ui-web";
import { gql } from "@social/data-access";
import Image from "next/image";
import dayjs from "dayjs";

interface ChatItemProps {
  chat: gql.Chat;
}

export const ChatItem = ({ chat }: ChatItemProps) => {
  return <></>;
};

const ChatItemNormal = ({
  chat,
  from,
  onProfile,
}: {
  chat: gql.Chat;
  from?: gql.shared.User | gql.shared.LightUser;
  onProfile?: (userId: string) => void;
}) => {
  return (
    <>
      <div className="chat-header pb-1">{from?.nickname || "unknown"}</div>
      <div
        className="w-10 h-10 chat-image ml-2 mr-[-8px]"
        onClick={() => {
          if (!onProfile) return;
          if (!from) return;
          onProfile(from.id);
        }}
      >
        {from?.image === null || typeof from === "undefined" ? (
          <EmptyProfile className="rounded-full overflow-hidden bg-gray-300" />
        ) : (
          <Image className="rounded-full" alt={"."} src={from.image?.url} height={40} width={40} />
        )}
      </div>
      <div className="chat-bubble normalChat">{chat.text}</div>
      <time className="text-xs opacity-50 chat-footer px-1">{dayjs(chat.at).format("HH:mm")}</time>
    </>
  );
};
ChatItem.Normal = ChatItemNormal;

const ChatItemTop = ({
  chat,
  from,
  onProfile,
}: {
  chat: gql.Chat;
  from?: gql.shared.User | gql.shared.LightUser;
  onProfile?: (userId: string) => void;
}) => {
  return (
    <>
      <div className="chat-header pb-1">{from?.nickname || "unknown"}</div>
      <div
        className="w-10 h-10 chat-image ml-2 mr-[-8px] rounded-full overflow-hidden"
        onClick={() => {
          if (!onProfile) return;
          if (!from) return;
          onProfile(from.id);
        }}
      >
        {from?.image === null || typeof from === "undefined" ? (
          <EmptyProfile className="rounded-full overflow-hidden bg-gray-300" />
        ) : (
          <Image className="" alt={"."} src={from.image?.url} height={40} width={40} />
        )}
      </div>
      <div className="chat-bubble topChat">{chat.text}</div>
    </>
  );
};
ChatItem.Top = ChatItemTop;

const ChatItemMiddle = ({ chat }: { chat: gql.Chat }) => {
  return (
    <>
      <div className="w-10 h-10 opacity-0" />
      <div className="chat-bubble middleChat">{chat.text}</div>
    </>
  );
};
ChatItem.Middle = ChatItemMiddle;

const ChatItemBottom = ({ chat }: { chat: gql.Chat }) => {
  return (
    <>
      <div className="w-10 h-10 opacity-0" />
      <div className="chat-bubble bottomChat">{chat.text}</div>
      <time className="text-xs opacity-50 chat-footer px-1">{dayjs(chat.at).format("HH:mm")}</time>
    </>
  );
};
ChatItem.Bottom = ChatItemBottom;

const SelfChatItemNormal = ({ chat }: { chat: gql.Chat }) => {
  return (
    <>
      <div className="chat-bubble normalChat">{chat.text}</div>
      <time className="text-xs opacity-50 chat-footer px-1">{dayjs(chat.at).format("HH:mm")}</time>
    </>
  );
};

ChatItem.SelfNormal = SelfChatItemNormal;

const SelfChatItemTop = ({ chat }: { chat: gql.Chat }) => {
  return <div className="chat-bubble topChat">{chat.text}</div>;
};
ChatItem.SelfTop = SelfChatItemTop;

const SelfChatItemMiddle = ({ chat }: { chat: gql.Chat }) => {
  return <div className="chat-bubble middleChat">{chat.text}</div>;
};
ChatItem.SelfMiddle = SelfChatItemMiddle;

const SelfChatItemBottom = ({ chat }: { chat: gql.Chat }) => {
  return (
    <>
      <div className="chat-bubble bottomChat">{chat.text}</div>
      <time className="text-xs opacity-50 chat-footer px-1">{dayjs(chat.at).format("HH:mm")}</time>
    </>
  );
};
ChatItem.SelfBottom = SelfChatItemBottom;

const ChatItemExit = ({ nickNames }: { nickNames: string[] }) => {
  return (
    <div className="my-4">
      {" "}
      <div className=" mx-8 bg-secondary bg-opacity-20 py-1 rounded flex justify-center">
        {" " + nickNames.join(", ")} 님이 방을 나가셨습니다.
      </div>
    </div>
  );
};
ChatItem.Exit = ChatItemExit;

const ChatItemJoin = ({ nickNames }: { nickNames: string[] }) => {
  return (
    <div className="my-4">
      {" "}
      <div className=" mx-8 bg-secondary bg-opacity-20 py-1 rounded flex justify-center">
        {" " + nickNames.join(", ")} 님이 입장하셨습니다.
      </div>
    </div>
  );
};
ChatItem.Join = ChatItemJoin;
