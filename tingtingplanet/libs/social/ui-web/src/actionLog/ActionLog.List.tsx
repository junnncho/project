import * as ActionLog from ".";
import { DataEditModal, DataListContainer, DataTableList } from "@shared/ui-web";
import { DefaultOf, ModelsProps, pageMap } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const ActionLogList = ({
  slice = st.slice.actionLog,
  init,
}: ModelsProps<slice.ActionLogSlice, gql.ActionLog>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={ActionLog.Item}
      renderDashboard={ActionLog.Stat}
      queryMap={gql.actionLogQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(actionLog: DefaultOf<gql.ActionLog>) => `${actionLog.type}`}>
          <ActionLog.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["id"]}
      actions={["edit"]}
    />
  );
};

// ! 샘플용 리스트입니다. 수정 또는 삭제가 필요합니다.
const ActionLogListInSelf = ({
  slice = st.slice.actionLog,
  self,
}: {
  slice?: slice.ActionLogSlice;
  self: gql.shared.User;
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  if (!self.id) {
    window.alert(`로그인이 필요합니다.`);
    router.push(pageMap.getUnauthorized());
  }
  return (
    <DataTableList
      slice={slice}
      init={{ query: { from: self.id } }}
      columns={["id", "createdAt", "status"]}
      onItemClick={(actionLog: gql.LightActionLog) => router.push(`actionLog/${actionLog.id}`)}
    />
  );
};
ActionLogList.InSelf = ActionLogListInSelf;
