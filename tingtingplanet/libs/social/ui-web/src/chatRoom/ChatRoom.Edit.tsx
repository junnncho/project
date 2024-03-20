import { slice, st, usePage } from "@social/data-access";

interface ChatRoomEditProps {
  chatRoomId?: string | null;
  slice?: slice.ChatRoomSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const ChatRoomEdit = ({ slice = st.slice.chatRoom, chatRoomId = undefined }: ChatRoomEditProps) => {
  const chatRoomForm = slice.use.chatRoomForm();
  const { l } = usePage();
  return (
    <div className="flex items-center mb-4">
        {/* <p className="w-20 mt-3">{l("chatRoom.field")}</p>
        <input className="input input-bordered" value={chatRoomForm.field} onChange={(e) => slice.do.setFieldOnChatRoom(e.target.value)} /> */}
      </div>
  );
};
