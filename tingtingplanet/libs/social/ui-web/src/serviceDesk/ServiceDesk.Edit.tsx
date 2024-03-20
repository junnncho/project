import { slice, st, usePage } from "@social/data-access";

interface ServiceDeskEditProps {
  serviceDeskId?: string | null;
  slice?: slice.ServiceDeskSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const ServiceDeskEdit = ({ slice = st.slice.serviceDesk, serviceDeskId = undefined }: ServiceDeskEditProps) => {
  const serviceDeskForm = slice.use.serviceDeskForm();
  const { l } = usePage();
  return (
    <div className="flex items-center mb-4">
        {/* <p className="w-20 mt-3">{l("serviceDesk.field")}</p>
        <input className="input input-bordered" value={serviceDeskForm.field} onChange={(e) => slice.do.setFieldOnServiceDesk(e.target.value)} /> */}
      </div>
  );
};
