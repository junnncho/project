import { st } from "@localjobs/frontend/stores";
import { ID } from "@shared/ui-web/common/Field";
import { ChatBoard } from "@social/ui-web";
import { useEffect } from "react";

export default function ChatList() {
  const chatBoardList = st.use.chatBoardList();
  const self = st.use.self();

  useEffect(() => {
    console.log(self.chatBoards);
    st.do.initChatBoard({ query: { _id: { $in: self.chatBoards } } });
  }, []);
  // useEffect(() => {}, [chatBoardList]);
  return (
    <>
      <div className="w-full py-4">
        {chatBoardList === "loading" ? <ChatBoard.Loading /> : <ChatBoard.List.InSelf chatBoardList={chatBoardList} />}
      </div>
    </>
  );
}
