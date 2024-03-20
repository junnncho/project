import { slice, st, usePage } from "@social/data-access";

interface ActionLogEditProps {
  actionLogId?: string | null;
  slice?: slice.ActionLogSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const ActionLogEdit = ({ slice = st.slice.actionLog, actionLogId = undefined }: ActionLogEditProps) => {
  const actionLogForm = slice.use.actionLogForm();
  const { l } = usePage();
  return (
    <div className="flex items-center mb-4">
        {/* <p className="w-20 mt-3">{l("actionLog.field")}</p>
        <input className="input input-bordered" value={actionLogForm.id} onChange={(e) => slice.do.setType(e.target.value)} /> */}
      </div>
  );
};
