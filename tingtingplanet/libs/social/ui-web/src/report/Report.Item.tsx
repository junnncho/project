import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ReportItem = ({
  report,
  slice = st.slice.report,
  actions,
  columns,
}: ModelProps<slice.ReportSlice, gql.LightReport>) => {
  return (
    <DataItem
      title={`${report.type}-${report.title}`}
      model={report}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
