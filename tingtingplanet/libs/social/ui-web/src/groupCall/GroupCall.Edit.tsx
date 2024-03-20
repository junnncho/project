import { slice, st, usePage } from "@social/data-access";

interface GroupCallEditProps {
  groupCallId?: string | null;
  slice?: slice.GroupCallSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const GroupCallEdit = ({ slice = st.slice.groupCall, groupCallId = undefined }: GroupCallEditProps) => {
  const groupCallForm = slice.use.groupCallForm();
  const { l } = usePage();
  return (
    <div className="flex items-center mb-4">
        <input
          className="input input-bordered"
          value={groupCallForm.roomId}
          onChange={(e) => slice.do.setRoomIdOnGroupCall(e.target.value)}
        />
      </div>
  );
};
