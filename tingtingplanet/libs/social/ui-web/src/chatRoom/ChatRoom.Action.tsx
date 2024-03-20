import { TextSendIcon } from "@shared/ui-web";
import { st } from "@social/data-access";
import { useRef } from "react";
interface ChattingBarProps {
  onSend: (text: string) => void;
  onBlur: () => void;
  onFocus: () => void;
}
export const ChattingBar = ({ onBlur, onFocus, onSend }: ChattingBarProps) => {
  const text = st.use.text();
  const chatRef = useRef<HTMLInputElement>(null);

  const onSendChat = (text: string) => {
    st.do.setText("");
    chatRef?.current?.blur();
    onSend(text);
  };
  return (
    <div className="flex w-full ">
      <div className="border-[3px] border-black border-r-[2px] flex-1 rounded-l-[10px] h-[50px] bg-white/30 backdrop-blur-xl">
        <input
          ref={chatRef}
          className="text-black text-[22px] w-full h-full bg-transparent border-0 rounded-[10px] placeholder:text-black placeholder:opacity-100 focus:outline-0"
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          // onMouseOut={() => !isMobile && lockKey(false)}
          value={text}
          onChange={(e) => st.do.setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && text) {
              onSendChat(text);
            }
          }}
          placeholder="type..."
        />
      </div>
      <div
        className="text-[22px] px-[7px] py-[12px]  md:px-[20px] md:py-[6px] h-[50px] bg-[#eee] rounded-r-[10px] border-[3px] border-black border-l-0 cursor-pointer hover:bg-gray-300 active:bg-gray-400 transition-all duration-500"
        onClick={() => onSendChat(text)}
      >
        <span className="hidden md:block">Enter</span>
        <span className="block px-2 md:hidden">
          <TextSendIcon />
        </span>
      </div>
    </div>
  );
};
