import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const EmojiItem = ({
  className,
  emoji,
  slice = st.slice.emoji,
  actions,
  columns,
}: ModelProps<slice.EmojiSlice, gql.LightEmoji>) => {
  return (
    <DataItem
      className={className}
      cover={<img alt="file" src={emoji.file.url} />}
      title={`${emoji.id}`}
      model={emoji}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
