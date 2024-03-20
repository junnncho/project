import { Field } from "@shared/ui-web";
import { slice, st, usePage } from "@social/data-access";

interface EmojiEditProps {
  emojiId?: string | null;
  slice?: slice.EmojiSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const EmojiEdit = ({ slice = st.slice.emoji, emojiId = undefined }: EmojiEditProps) => {
  const emojiForm = slice.use.emojiForm();
  const { l } = usePage();
  return (
    <>
      <Field.Text label={l("emoji.name")} value={emojiForm.name} onChange={st.do.setNameOnEmoji} />
      <Field.Img
        label={l("emoji.file")}
        addFiles={st.do.uploadFileOnEmoji}
        file={emojiForm.file}
        onRemove={() => st.do.setFileOnEmoji(null)}
      />
    </>
  );
};
