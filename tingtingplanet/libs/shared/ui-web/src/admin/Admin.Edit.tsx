import { Field } from "@shared/ui-web";
import { slice, st, usePage } from "@shared/data-access";

interface AdminEditProps {
  adminId?: string | null;
  slice?: slice.AdminSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const AdminEdit = ({ slice = st.slice.admin, adminId = undefined }: AdminEditProps) => {
  const adminForm = slice.use.adminForm();
  const { l } = usePage();
  return (
    <>
      <Field.Text label={l("admin.accountId")} value={adminForm.accountId} onChange={slice.do.setAccountIdOnAdmin} />
      <Field.Password
        value={adminForm.password}
        onChange={(password) => {
          console.log(password);
          slice.do.setPasswordOnAdmin(password);
        }}
      />
    </>
  );
};
