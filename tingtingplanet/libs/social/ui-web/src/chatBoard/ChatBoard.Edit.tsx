import { slice, st, usePage } from "@social/data-access";

interface ChatBoardEditProps {
  chatBoardId?: string | null;
  slice?: slice.ChatBoardSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const ChatBoardEdit = ({ slice = st.slice.chatBoard, chatBoardId = undefined }: ChatBoardEditProps) => {
  const chatBoardForm = slice.use.chatBoardForm();
  return (
    <div className="flex items-center mb-4">
      {/* <p className="w-20 mt-3">{l("chatBoard.field")}</p>
        <Input value={chatBoardForm.field} onChange={(e) => slice.do.setFieldOnChatBoard(e.target.value)} /> */}
    </div>
  );
};
