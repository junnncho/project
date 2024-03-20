"use client";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { DataAction, SliceModel } from "@shared/util-client";
import { Popconfirm } from "@shared/ui-web";
import { Utils } from "@shared/util";
import { usePage } from "@shared/data-access";

interface DataHandleActionProps<T extends string, M extends { id: string }, L extends { id: string }> {
  action: DataAction<L>;
  model: L;
  slice: SliceModel<T, M, L>;
}
export const DataHandleAction = <T extends string, M extends { id: string }, L extends { id: string }>({
  action,
  model,
  slice,
  outline = true,
}: DataHandleActionProps<T, M, L> & { outline?: boolean }) => {
  const { l } = usePage();
  return action === "edit" ? (
    <button
      className={`m-1 text-center btn btn-square btn-ghost btn-sm ${outline && "border-dashed btn-outline"}`}
      onClick={() => (slice.do[`edit${Utils.capitalize(slice.refName)}`] as any)(model.id)}
    >
      <AiOutlineEdit key={action} />
    </button>
  ) : action === "view" ? (
    <button
      className={`m-1 text-center btn btn-square btn-ghost btn-sm ${outline && "border-dashed btn-outline"}`}
      onClick={() => (slice.do[`view${Utils.capitalize(slice.refName)}`] as any)(model.id)}
    >
      <AiOutlineEye key={action} />
    </button>
  ) : action === "remove" ? (
    <Popconfirm
      key={action}
      title={l("main.removeMsg")}
      onConfirm={() => (slice.do[`remove${Utils.capitalize(slice.refName)}`] as any)(model.id)}
    >
      <button className={`m-1 text-center btn btn-square btn-ghost btn-sm ${outline && "border-dashed btn-outline"}`}>
        <AiOutlineDelete />
      </button>
    </Popconfirm>
  ) : action.render ? (
    (action.render() as JSX.Element)
  ) : (
    <></>
  );
};
