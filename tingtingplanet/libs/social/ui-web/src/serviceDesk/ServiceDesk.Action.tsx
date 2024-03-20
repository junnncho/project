import { AiOutlineNumber } from "react-icons/ai";
import { gql, slice, st } from "@social/data-access";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.ServiceDeskSlice;
  serviceDesk: gql.LightServiceDesk;
  idx?: number;
}
export const Approve = ({ slice = st.slice.serviceDesk, serviceDesk, idx }: ApproveProps) => {
  return (
    <button
      className="gap-2 btn"
      onClick={() => null}
      // onClick={() => slice.do.processServiceDesk(serviceDesk.id, idx)}
    >
      <AiOutlineNumber />
      Approve
    </button>
  );
};
