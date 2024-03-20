import * as Emoji from ".";
import { DataEditModal, DataListContainer, WindowHeader } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useEffect } from "react";
import Image from "next/image";

export const EmojiList = ({ slice = st.slice.emoji, init }: ModelsProps<slice.EmojiSlice, gql.Emoji>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Emoji.Item}
      renderDashboard={Emoji.Stat}
      queryMap={gql.emojiQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(emoji: DefaultOf<gql.Emoji>) => `${emoji.id}`}>
          <Emoji.Edit slice={slice} />
        </DataEditModal>
      }
      columns={["email"]}
      actions={["edit"]}
    />
  );
};

interface EmojiListBoxProps {
  className: string;
  onClick: (emoji: gql.LightEmoji) => void;
}

export const EmojiListBox = ({ className, onClick }: EmojiListBoxProps) => {
  // const isShowEmojiSelecter = st.use.isShowEmojiSelecter();
  const emojiList = st.use.emojiList();

  useEffect(() => {
    st.do.initEmoji();
  }, []);

  if (emojiList === "loading") return null;

  //!need to change
  return (
    <div
      className={` w-[282px] rounded-md border-[3px] border-solid border-black absolute md:bottom-[0px] bottom-[81px] md:left-[0px] left-[21px] md:relative origin-top-left overflow-hidden ${className}`}
    >
      <WindowHeader title="Emoji" type="reduce" close={() => st.do.setEmojiModal(null)} />
      <div className="bg-gray-300 bg-opacity-40 backdrop-blur-md h-[282px] p-3 overflow-y-auto">
        <div className="grid grid-cols-4">
          {emojiList.map((emoji, idx) => (
            <button
              className="flex items-center justify-center bg-transparent"
              onClick={() => {
                onClick(emoji);
                st.do.setEmojiModal(null);
              }}
            >
              <div className="w-[(282/4)px] h-[(282/4)px)]">
                <Image width={49} height={49} src={emoji.file.url} alt="emoji" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

EmojiList.Box = EmojiListBox;
