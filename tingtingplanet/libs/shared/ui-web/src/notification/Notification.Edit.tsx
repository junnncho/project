import { slice, st, usePage } from "@shared/data-access";

interface NotificationEditProps {
  notificationId?: string | null;
  slice?: slice.NotificationSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const NotificationEdit = ({
  slice = st.slice.notification,
  notificationId = undefined,
}: NotificationEditProps) => {
  const notificationForm = slice.use.notificationForm();
  const { l } = usePage();
  return (
    <div className="flex items-center mb-4">
        <p className="w-20 mt-3">{l("notification.field")}</p>
      </div>
  );
};
