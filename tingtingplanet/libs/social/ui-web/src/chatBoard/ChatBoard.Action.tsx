import { CheckCircleOutlined, NumberOutlined } from "@ant-design/icons";
import { Modal, RecentTime } from "@shared/ui-web";
import { gql, slice, st } from "@social/data-access";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.ChatBoardSlice;
  chatBoard: gql.LightChatBoard;
  idx?: number;
}
export const Approve = ({ slice = st.slice.chatBoard, chatBoard, idx }: ApproveProps) => {
  return (
    <button
      className="gap-2 btn"
      // onClick={() => slice.do.processChatBoard(chatBoard.id, idx)}
      onClick={() => null}
    >
      <NumberOutlined />
      Approve
    </button>
  );
};

// ! 샘플 액션(모달 상세버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface DenyProps {
  slice?: slice.ChatBoardSlice;
  chatBoard: gql.LightChatBoard;
  idx?: number;
}
export const Deny = ({ slice = st.slice.chatBoard, chatBoard, idx }: DenyProps) => {
  const chatBoardForm = slice.use.chatBoardForm();
  const chatBoardModal = slice.use.chatBoardModal();
  return (
    <>
      <button
        className="gap-2 btn btn-primary"
        onClick={() =>
          slice.do.editChatBoard(chatBoard.id, {
            modal: `deny-${chatBoard.id}`,
          })
        }
      >
        <CheckCircleOutlined />
        Deny
      </button>
      <Modal
        key={chatBoard.id}
        width="80%"
        open={chatBoardModal === `deny-${chatBoard.id}`}
        onCancel={() => slice.do.resetChatBoard()}
        // onOk={() => slice.do.denyChatBoard(chatBoard.id, idx)}
        okButtonProps={{ disabled: false }}
      >
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>{chatBoard.id}</h3>
        </div>
        <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
          <div>{chatBoard.status}</div>
          <RecentTime
            date={chatBoard.createdAt}
            breakUnit="second"
            timeOption={{ dateStyle: "short", timeStyle: "short" }}
          />
        </div>
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>Deny Reason</h3>
          <input className="input input-bordered" />
        </div>
      </Modal>
    </>
  );
};

export const SendChat = ({ slice = st.slice.chatBoard }: { slice?: slice.ChatBoardSlice }) => {
  const [text, setText] = useState<string>("");
  const textRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-t-xl">
      <div className="relative w-full">
        <div className="flex w-full h-10 border input input-primary input-sm rounded-xl items-center">
          <input
            ref={textRef}
            type="text"
            className="flex-grow focus:outline-none "
            placeholder="메세지를 입력하세요"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (!text) return;
                st.do.sendChat(text);
                setText("");
                textRef.current?.focus();
              }
            }}
          />
          <button
            className={`flex items-center justify-center  px-2 py-1 ml-2 rounded-lg btn-ghost btn-sm duration-300 ${
              text ? "text-primary " : " text-gray-500 "
            }`}
            onClick={() => {
              if (!text) return;
              st.do.sendChat(text);
              setText("");
              textRef.current?.focus();
            }}
          >
            전 송{/* <Send className="-mt-px transform rotate-45" width={20} /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Invite = ({
  slice = st.slice.chatBoard,
  chatBoardId,
  userId,
}: {
  slice?: slice.ChatBoardSlice;
  chatBoardId: string;
  userId: string;
}) => {
  return <button onClick={() => slice.do.inviteChatBoard(chatBoardId, userId)}>invite{chatBoardId + userId}</button>;
};

export const Exit = ({
  slice = st.slice.chatBoard,
  chatBoardId,
  onClick,
}: {
  slice?: slice.ChatBoardSlice;
  chatBoardId: string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await slice.do.exitChatBoard(chatBoardId);
        onClick ? onClick() : router.back();
      }}
    >
      exit
    </button>
  );
};

export const Join = ({
  slice = st.slice.chatBoard,
  chatBoardId,
}: {
  slice?: slice.ChatBoardSlice;
  chatBoardId: string;
}) => {
  return <button onClick={() => slice.do.joinChatBoard(chatBoardId)}>Join{chatBoardId}</button>;
};
