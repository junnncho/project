import { Card, Field, message } from "@shared/ui-web";
import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import { gql, slice, st, usePage } from "@shared/data-access";

interface AuthProps {
  logo?: ReactNode;
  topMenu?: string;
}

export const Auth = ({ topMenu = "signin", logo }: AuthProps) => {
  const adminForm = st.use.adminForm();
  const { l } = usePage();
  //add enter key event

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        st.do.signinAdmin();
      }
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          st.do.signinAdmin();
        }
      });
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#ddd] flex items-center justify-center">
      {topMenu === "signin" && (
        <div className="flex flex-col gap-4 p-8 bg-white border border-gray-300 w-96 rounded-2xl shadowa">
          <div className="grid w-full place-items-center">Admin System</div>
          <div className="grid w-full place-items-center">{logo} </div>
          <div className="flex justify-center w-full gap-1">
            <div className="grid w-24 place-items-center">Account: </div>
            <Field.ID value={adminForm.accountId} onChange={st.do.setAccountIdOnAdmin} />
          </div>
          <div className="flex justify-center w-full gap-1">
            <div className="grid w-24 place-items-center">Password: </div>
            <Field.Password value={adminForm.password} onChange={st.do.setPasswordOnAdmin} />
          </div>
          <button
            className="w-full btn"
            onKeyDown={(e) => {
              console.log(e.key);
              e.key === "Enter" && st.do.signinAdmin();
            }}
            onClick={() => st.do.signinAdmin()}
          >
            {l("main.signIn")}
          </button>
        </div>
      )}
      {topMenu === "signup" && (
        <>
          <Card title={l("main.signUp")}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={st.do.createAdmin}
              onFinishFailed={(e) => message.error(l("main.signUpFailed"))}
              autoComplete="off"
            >
              <Field.ID value={adminForm.accountId} onChange={st.do.setAccountIdOnAdmin} />
              <Field.Password value={adminForm.password} onChange={st.do.setPasswordOnAdmin} />
              <button type="submit" className="w-full btn">
                {l("main.signUp")}
              </button>
            </Form>
          </Card>
          <div style={{ textAlign: "right" }}>
            <button
              className="btn btn-link"
              onClick={() => {
                //
              }}
            >
              {l("main.signIn")} &gt;&gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

interface ManageAdminRoleProps {
  admin: gql.LightAdmin;
  slice?: slice.AdminSlice;
  idx?: number;
}
export const ManageAdminRole = ({ admin, slice = st.slice.admin, idx }: ManageAdminRoleProps) => {
  if (admin.roles.includes("admin"))
    return <div onClick={() => slice.do.subAdminRole(admin.id, "admin", idx)}>Remove Admin</div>;
  else return <div onClick={() => slice.do.addAdminRole(admin.id, "admin", idx)}>Add Admin</div>;
};

interface ManageSuperAdminRoleProps {
  admin: gql.LightAdmin;
  slice?: slice.AdminSlice;
  idx?: number;
}
export const ManageSuperAdminRole = ({ admin, slice = st.slice.admin, idx }: ManageSuperAdminRoleProps) => {
  if (admin.roles.includes("superAdmin"))
    return <div onClick={() => slice.do.subAdminRole(admin.id, "superAdmin", idx)}>Remove SuperAdmin</div>;
  else return <div onClick={() => slice.do.addAdminRole(admin.id, "superAdmin", idx)}>Add SuperAdmin</div>;
};
