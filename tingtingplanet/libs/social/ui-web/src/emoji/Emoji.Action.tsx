import { AiOutlineNumber, AiOutlineSmile } from "react-icons/ai";
import { gql, slice, st } from "@social/data-access";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.EmojiSlice;
  emoji: gql.LightEmoji;
  idx?: number;
}
export const Approve = ({ slice = st.slice.emoji, emoji, idx }: ApproveProps) => {
  return (
    <button className="gap-2 btn" onClick={() => null}>
      <AiOutlineNumber />
      Approve
    </button>
  );
};

export const Open = () => {
  return (
    <button
      onClick={() => st.do.setEmojiModal("open")}
      className="text-[26px] flex items-center justify-center h-[50px] w-[50px] border-[3px] border-black bg-white rounded-[10px] cursor-pointer transition duration-500 hover:bg-gray-100"
    >
      <AiOutlineSmile />
    </button>
  );
};
