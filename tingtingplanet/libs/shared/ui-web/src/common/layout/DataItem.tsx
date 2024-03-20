import { AiOutlineMore } from "react-icons/ai";
import { Card, Dropdown } from "@shared/ui-web";
import { DataAction, DataColumn, SliceModel } from "@shared/util-client";
import { DataHandleAction } from "./DataHandleAction";
import { Utils } from "@shared/util";
import { convToAntdColumn } from "./DataColumn";
import { twMerge } from "tailwind-merge";
import React, { ReactNode } from "react";

interface DataItemProps<T extends string, M extends { id: string }, L extends { id: string }> {
  className?: string;
  model: L;
  slice: SliceModel<T, M, L>;
  onClick?: () => void;
  cover?: ReactNode;
  title?: ReactNode;
  actions?: DataAction<L>[];
  columns?: DataColumn<any>[];
  children?: ReactNode;
}
export const DataItem = React.memo(
  <T extends string, M extends { id: string }, L extends { id: string }>({
    className,
    model,
    cover,
    slice,
    onClick,
    title,
    actions = [],
    columns = [],
    children,
  }: DataItemProps<T, M, L>) => {
    const strActions = actions
      .filter((action) => typeof action === "string")
      .map((action, idx) => <DataHandleAction key={idx} action={action} outline={false} model={model} slice={slice} />);

    const customActions = actions
      .filter((action) => typeof action !== "string")
      .map((action, idx) => ({
        key: idx,
        label: typeof action !== "string" ? action.render() : null,
      }));

    const cols = columns.map((column, idx) => {
      const key = typeof column === "string" ? column : column.key;
      const render = convToAntdColumn(column).render ?? ((v: any, m: any, i: number) => Utils.prettyPrint(v));
      return (
        <div key={idx} className="flex-wrap overflow-hidden ">
          {key}: {render(model[key], model, idx)}
        </div>
      );
    });
    return (
      <Card
        className={twMerge("mx-1", className)}
        onClick={onClick}
        cover={cover}
        hoverable
        title={title}
        footer={
          <div className="flex w-full border-t border-gray-100">
            {strActions.map((action, idx) => (
              <div className="flex items-center justify-center flex-1 h-12 " key={idx}>
                {action}
              </div>
            ))}
          </div>
        }
      >
        {children}
        {cols}
        <div>
          {customActions.length ? (
            <div className="absolute right-1 top-1">
              <Dropdown
                buttonClassName="btn btn-square btn-ghost"
                value={<AiOutlineMore />}
                content={customActions.map((action) => (
                  <button className="font-light btn btn-ghost btn-sm" key={action.key}>
                    {action.label}
                  </button>
                ))}
              />
            </div>
          ) : null}
        </div>
      </Card>
    );
  }
);
