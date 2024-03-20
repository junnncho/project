import { Field } from "@shared/ui-web";
import { cnst } from "@shared/util";
import { slice, st, usePage } from "@social/data-access";

interface BoardEditProps {
  boardId?: string | null;
  slice?: slice.BoardSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const BoardEdit = ({ slice = st.slice.board, boardId = undefined }: BoardEditProps) => {
  const boardForm = slice.use.boardForm();
  const { l } = usePage();
  return (
    <>
      <Field.Text label={l("board.name")} value={boardForm.name} onChange={slice.do.setNameOnBoard} />
      <Field.TextArea
        label={l("board.description")}
        value={boardForm.description}
        onChange={slice.do.setDescriptionOnBoard}
      />
      <Field.Tags
        label={l("board.categories")}
        values={boardForm.categories}
        onUpdate={slice.do.setCategoriesOnBoard}
      />
      <Field.SelectItem
        label={l("board.viewStyle")}
        items={cnst.boardViewStyles}
        value={boardForm.viewStyle}
        onChange={slice.do.setViewStyleOnBoard}
      />
      <Field.SelectItem
        mode="multiple"
        label={l("board.policy")}
        items={cnst.boardPolicies}
        value={boardForm.policy}
        onChange={slice.do.setPolicyOnBoard}
      />
      <Field.SelectItem
        mode="multiple"
        label={l("board.roles")}
        items={cnst.userRoles}
        value={boardForm.roles}
        onChange={slice.do.setRolesOnBoard}
      />
    </>
  );
};
