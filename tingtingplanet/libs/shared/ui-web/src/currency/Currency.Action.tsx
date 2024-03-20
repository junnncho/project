import { AiOutlineNumber } from "react-icons/ai";
import { gql, slice, st } from "@shared/data-access";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.CurrencySlice;
  currency: gql.LightCurrency;
  idx?: number;
}
export const Approve = ({ slice = st.slice.currency, currency, idx }: ApproveProps) => {
  return (
    <button
      className="btn gap-2"
      // onClick={() => slice.do.processCurrency(currency.id, idx)}
      onClick={() => null}
    >
      <AiOutlineNumber />
      Approve
    </button>
  );
};
