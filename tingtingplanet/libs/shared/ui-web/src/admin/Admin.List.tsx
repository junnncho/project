import * as Admin from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const AdminList = ({ slice = st.slice.admin, init }: ModelsProps<slice.AdminSlice, gql.Admin>) => {
  const me = st.use.me();

  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Admin.Item}
      renderDashboard={Admin.Stat}
      queryMap={gql.adminQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(admin: DefaultOf<gql.Admin>) => `${admin.accountId}`}>
          <Admin.Edit slice={slice} />
        </DataEditModal>
      }
      columns={["accountId", "roles"]}
      actions={(admin: gql.Admin, idx) => [
        "edit",
        "remove",
        ...(me.hasAccess("admin") && admin.id !== me.id
          ? [
              {
                type: "admin",
                render: () => <Admin.Action.ManageAdminRole admin={admin} slice={slice} idx={idx} />,
              },
            ]
          : []),
        ...(me.hasAccess("superAdmin") && admin.id !== me.id
          ? [
              {
                type: "superAdmin",
                render: () => <Admin.Action.ManageSuperAdminRole admin={admin} slice={slice} idx={idx} />,
              },
            ]
          : []),
      ]}
    />
  );
};
