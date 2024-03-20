import { Field } from "@shared/ui-web";
import { cnst } from "@shared/util";
import { slice, st, usePage } from "@shared/data-access";

interface CurrencyEditProps {
  currencyId?: string | null;
  slice?: slice.CurrencySlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const CurrencyEdit = ({ slice = st.slice.currency, currencyId = undefined }: CurrencyEditProps) => {
  const currencyForm = slice.use.currencyForm();
  const { l } = usePage();
  return (
    <>
      <Field.Text label={l("currency.name")} value={currencyForm.name} onChange={slice.do.setNameOnCurrency} />
      <Field.SelectItem
        label={l("currency.symbol")}
        items={cnst.currencySymbols}
        value={currencyForm.symbol}
        onChange={slice.do.setSymbolOnCurrency}
      />
      <Field.SelectItem
        label={l("currency.type")}
        items={cnst.currencyTypes}
        value={currencyForm.type}
        onChange={slice.do.setTypeOnCurrency}
      />
      <Field.Tags
        label={l("currency.services")}
        values={currencyForm.services}
        onUpdate={slice.do.setServicesOnCurrency}
      />
    </>
  );
};
