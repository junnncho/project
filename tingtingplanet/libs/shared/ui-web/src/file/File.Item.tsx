import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const FileItem = ({
  file,
  slice = st.slice.file,
  actions,
  columns,
}: ModelProps<slice.FileSlice, gql.LightFile>) => {
  return (
    <DataItem
      title={`${file.filename}-${file.createdAt}`}
      model={file}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
