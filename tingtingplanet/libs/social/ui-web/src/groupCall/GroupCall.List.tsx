import * as GroupCall from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const GroupCallList = ({
  slice = st.slice.groupCall,
  init,
}: ModelsProps<slice.GroupCallSlice, gql.GroupCall>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={GroupCall.Item}
      renderDashboard={GroupCall.Stat}
      queryMap={gql.groupCallQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(groupCall: DefaultOf<gql.GroupCall>) => `${groupCall.id}`}>
          <GroupCall.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["type", "status", "createdAt"]}
      actions={(groupCall: gql.LightGroupCall, idx) => [
        "remove",
        "edit",
        // { type: "approve", render: () => <GroupCall.Action.Approve groupCall={groupCall} idx={idx} slice={slice} /> },
      ]}
    />
  );
};
