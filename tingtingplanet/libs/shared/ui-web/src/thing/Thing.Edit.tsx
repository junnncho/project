import { Field } from "@shared/ui-web";
import { slice, st, usePage } from "@shared/data-access";

interface ThingEditProps {
  thingId?: string | null;
  slice?: slice.ThingSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const ThingEdit = ({ slice = st.slice.thing, thingId = undefined }: ThingEditProps) => {
  const thingForm = slice.use.thingForm();
  const { l } = usePage();
  return (
    <>
      <Field.Text label={l("thing.name")} value={thingForm.name} onChange={slice.do.setNameOnThing} />
      <Field.Text
        label={l("thing.description")}
        value={thingForm.description}
        onChange={slice.do.setDescriptionOnThing}
      />
      {/* <Select value={type} style={{ width: "100%" }} onChange={(type) => slice.setState({ type })}>
          {cnst.thingTypes.map((type) => (
            <Select.Option value={type}>{type}</Select.Option>
          ))}
        </Select> */}
      <Field.Img
        label={l("thing.image")}
        addFiles={slice.do.uploadImageOnThing}
        file={thingForm.image}
        onRemove={() => slice.do.setImageOnThing(null)}
      />
    </>
  );
};
