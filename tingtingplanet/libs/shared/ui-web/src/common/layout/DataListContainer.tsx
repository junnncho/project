"use client";
import { AiOutlineEllipsis, AiOutlinePlus, AiOutlineRedo } from "react-icons/ai";
import { Card, Dropdown, Empty, List, Select, Skeleton, Table, Typography } from "@shared/ui-web";
import { DataAction, DataColumn, DataTool, InitActionForm, Slice } from "@shared/util-client";
import { DataHandleAction } from "./DataHandleAction";
import { DataPagination, DataSearch } from "./DataList";
import { Utils } from "@shared/util";
import { convToAntdColumn } from "./DataColumn";
import { st, usePage } from "@shared/data-access";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import pluralize from "pluralize";

type SortOption<M> = { key: string; sort: { [key: string]: 1 | -1 } };
type FilterOption<M> = { key: string; query: { [key: string]: any } };
type DataItemProps<T extends string, M extends { id: string }, L extends { id: string }> = {
  [key in T]: L;
} & { slice: Slice<T, any> };

interface DataListContainerProps<T extends string, State, M extends { id: string }, L extends { id: string }> {
  className?: string;
  type?: "card" | "list";
  init?: InitActionForm<M>;
  slice: Slice<T, State>; //SliceModel<T, M, L>;
  edit?: JSX.Element;
  view?: (props: { [key in T]: M }) => JSX.Element;
  title?: string;
  filterOptions?: FilterOption<M>[];
  sortOptions?: SortOption<M>[];
  columns?: DataColumn<any>[];
  tools?: DataTool[];
  actions?: DataAction<L>[] | ((item: L, idx: number) => DataAction<L>[]);
  queryMap?: { [key: string]: any };
  renderDashboard?: ({ summary, hidePresents }: any) => JSX.Element;
  renderItem?: (args: DataItemProps<T, M, L> & any) => ReactNode;
  renderLoading?: () => ReactNode;
}

export const DataListContainer = <T extends string, State, M extends { id: string }, L extends { id: string }>({
  className,
  type = "card",
  init,
  edit,
  view,
  slice,
  title,
  filterOptions = [],
  sortOptions = [],
  columns = ["id", "createdAt", "updatedAt"],
  actions,
  tools = [],
  queryMap,
  renderDashboard,
  renderItem = ({ [slice.refName]: model }) => <Card title={model.id} />,
  renderLoading,
}: DataListContainerProps<T, State, M, L>) => {
  const [modelName, modelClassName] = [slice.refName, Utils.capitalize(slice.refName)];
  const filter = useSearchParams().get("filter") as string;
  const filterQuery = queryMap ? (filter ? queryMap[filter] ?? {} : {}) : {};
  const modelCount = slice.use[`${modelName}Count` as any]();
  const filterOpts: FilterOption<M>[] = [...filterOptions];
  const fitlerOpt = slice.use[`queryOf${modelClassName}`]();
  // const [filterOpt, selectFilter] = useState<FilterOption<M>>(filterOpts[0]);
  const sortOpts: SortOption<M>[] = [
    { key: "Newest", sort: { createdAt: -1 } as any },
    { key: "Oldest", sort: { createdAt: 1 } as any },
    ...sortOptions,
  ];
  const toolMenu = useMemo(
    () => ({
      onClick: ({ key }) => tools.find((tool) => tool.label === key)?.onClick(),
      items: tools.map((tool) => ({
        label: tool.label,
        key: tool.label,
        icon: tool.icon,
      })),
    }),
    []
  );
  useEffect(() => {
    slice.do[`init${modelClassName}` as any]({
      ...(init ?? {}),
      query: { ...filterQuery, ...(init?.query ?? {}) },
    });
  }, [filter]);
  const { l } = usePage();
  const ModelEdit = (): JSX.Element => {
    const Edit = () => edit ?? <></>;
    return <Edit />;
  };
  const ModelView = (): JSX.Element => {
    const model = slice.use[modelName as any]();
    const View = view;
    if (View && model !== "loading") return <View {...({ [modelName as any]: model } as any)} />;
    else return <></>;
  };
  const ModelDashboard = (): JSX.Element => {
    const summary = (st as any).use.summary && (st as any).use.summary();
    const Stat = renderDashboard;
    if (!Stat) return <></>;
    return (
      <div className="mb-4">
        {summary === "loading" ? <Skeleton active /> : <Stat summary={summary} hidePresents />}
      </div>
    );
  };
  return (
    <div className={twMerge("m-4", className)}>
      <div className="flex flex-wrap justify-between mb-3">
        <div className="flex pb-1">
          <Typography.Title className="" level={4}>
            {title ?? pluralize(Utils.capitalize(slice.refName))} ({modelCount})
          </Typography.Title>

          {edit && (
            <div>
              <div className="ml-3">
                <button
                  onClick={() => slice.do[`new${modelClassName}` as any]()}
                  className="mr-[0.5px] rounded-r-none btn btn-sm btn-primary"
                >
                  <AiOutlinePlus /> {l("main.new")}
                </button>
                <Dropdown
                  buttonClassName="btn btn-primary btn-sm rounded-l-none"
                  value={<AiOutlineEllipsis />}
                  content={toolMenu.items.map((item) => (
                    <button className="flex gap-2 font-light btn btn-ghost btn-sm" key={item.key}>
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                />
              </div>
            </div>
          )}
        </div>
        {filterOpts.length ? (
          <div className="">
            {filterOpts.map((filterOption) => (
              <button
                key={filterOption.key}
                className={twMerge(
                  "btn px-2 mx-2 rounded-md btn-sm",
                  `${JSON.stringify(filterOption.query) === JSON.stringify(fitlerOpt) ? "btn-primary" : "btn-outline"}`
                )}
                onClick={async () =>
                  await slice.do[`setQueryOf${modelClassName}` as any](filterOption.query, { invalidate: true })
                }
              >
                {filterOption.key}
              </button>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div className="flex">
          <button
            className="mx-1 btn btn-primary btn-sm btn-square"
            onClick={() => slice.do[`refresh${modelClassName}` as any]({ invalidate: true })}
          >
            <AiOutlineRedo className="mx-2" />
          </button>
          <Select
            className="mx-1"
            defaultValue={sortOpts[0].key}
            style={{ width: 250 }}
            onChange={(key) =>
              slice.do[`setSortOf${modelClassName}` as any](
                sortOpts.find((sortOpt) => sortOpt.key === key)?.sort ?? sortOpts[0].sort
              )
            }
          >
            {sortOpts.map((sortOption) => (
              <Select.Option key={sortOption.key} value={sortOption.key}>
                {sortOption.key}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      {!init?.query && <ModelDashboard />}
      {type === "card" ? (
        <DataCardList
          slice={slice}
          renderItem={renderItem}
          renderLoading={renderLoading}
          columns={columns}
          actions={actions}
        />
      ) : (
        <DataTableList columns={columns} slice={slice} actions={actions} />
      )}
      <ModelEdit />
      <ModelView />
    </div>
  );
};

interface DataCardListProps<T extends string, M extends { id: string }, L extends { id: string }> {
  className?: string;
  init?: InitActionForm<M>;
  slice: Slice<T, any>;
  columns: DataColumn<any>[];
  actions?: DataAction<L>[] | ((item: L, idx: number) => DataAction<L>[]);
  renderItem: (args: DataItemProps<T, M, L>) => ReactNode;
  renderLoading?: () => ReactNode;
}
export const DataCardList = <T extends string, M extends { id: string }, L extends { id: string }>({
  className,
  init,
  slice,
  actions,
  columns,
  renderItem,
  renderLoading,
}: DataCardListProps<T, M, L>) => {
  const [modelName, modelClassName] = [slice.refName, Utils.capitalize(slice.refName)];
  const modelList = slice.use[`${modelName}List` as any]();
  const limitOfModel = slice.use[`limitOf${modelClassName}` as any]();
  useEffect(() => {
    init && slice.do[`init${modelClassName}` as any](init);
  }, []);
  return (
    <div className={className}>
      {modelList === "loading" ? (
        <List
          grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 5, xxl: 5 }}
          dataSource={new Array(limitOfModel || 20).fill(0)}
          renderItem={() => <List.Item>{renderLoading ? renderLoading() : <Skeleton active />}</List.Item>}
        />
      ) : (
        <List
          grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 5, xxl: 5, gutter: 0 }}
          dataSource={modelList}
          renderItem={(model: any, idx) => (
            <List.Item itemLayout="vertical">
              {renderItem({
                [slice.refName]: model,
                slice,
                actions: typeof actions === "function" ? actions(model, idx) : actions,
                columns,
                idx,
              } as DataItemProps<T, M, L>)}
            </List.Item>
          )}
        />
      )}
      <DataPagination slice={slice} />
    </div>
  );
};

interface DataTableListProps<T extends string, M extends { id: string }, L> {
  className?: string;
  init?: InitActionForm<M>;
  slice: Slice<T, any>;
  columns: DataColumn<any>[];
  actions?: DataAction<L>[] | ((item: L, idx: number) => DataAction<L>[]);
  onItemClick?: (item: L, idx: number) => void;
}
export const DataTableList = <T extends string, M extends { id: string }, L>({
  className,
  init,
  slice,
  columns,
  actions,
  onItemClick,
}: DataTableListProps<T, M, L>) => {
  const [modelName, modelClassName] = [slice.refName, Utils.capitalize(slice.refName)];
  const modelList = slice.use[`${modelName}List` as any]();
  useEffect(() => {
    init && slice.do[`init${modelClassName}` as any](init);
  }, []);
  const cols = useMemo(() => {
    const firstCol: any = convToAntdColumn(columns[0]);
    return [
      {
        ...firstCol,
        render: (value, model, idx) => (
          <div key={`${model.id}-${idx}`} className="flex items-center">
            <div className="mr-2">{firstCol.render ? firstCol.render(value, model, idx) : value}</div>
            {actions &&
              (typeof actions === "function" ? actions(model, idx) : actions)
                .filter((action) => typeof action === "string")
                .map((action, idx) => (
                  <DataHandleAction key={`${model.id}-${action}`} model={model} action={action} slice={slice as any} />
                ))}
          </div>
        ),
      },
      ...columns.slice(1).map(convToAntdColumn),
      ...(actions
        ? [
            {
              key: "actions",
              dataIndex: "id",
              title: "Actions",
              render: (_, model, idx) => (
                <div className="flex gap-1">
                  {(typeof actions === "function" ? actions(model, idx) : actions)
                    .filter((action) => typeof action !== "string")
                    .map((action, idx) => (
                      <DataHandleAction key={`${model.id}-${idx}`} model={model} action={action} slice={slice as any} />
                    ))}
                </div>
              ),
            },
          ]
        : []),
    ];
  }, []);
  return (
    <div className={className}>
      <Table
        dataSource={(modelList === "loading" ? [] : modelList) as any[]}
        columns={cols}
        loading={modelList === "loading"}
        size="small"
        rowKey={(model) => model.id}
        pagination={false}
        onRow={(model, idx) => ({
          onClick: () => onItemClick && onItemClick(model, idx ?? 0),
        })}
      />
      <DataPagination slice={slice} />
      <DataSearch slice={slice} />
    </div>
  );
};

interface LoadItemsProps<T extends string, M extends { id: string }, L> {
  className?: string;
  init?: InitActionForm<M>;
  slice: Slice<T, any>;
  loading?: ReactNode;
  noDiv?: boolean;
  from?: number;
  to?: number;
  filter?: (item: L, idx: number) => boolean;
  renderEmpty?: () => ReactNode;
  renderItem: (item: L, idx: number) => ReactNode;
  onLoad?: (modelList: L[]) => void;
}
export const LoadItems = <T extends string, M extends { id: string }, L>({
  className,
  slice,
  loading,
  init,
  noDiv,
  from,
  to,
  renderItem,
  renderEmpty = noDiv
    ? () => null
    : () => (
        <div className="grid w-full h-full place-items-center">
          <Empty className="py-16" />
        </div>
      ),
  filter = () => true,
  onLoad,
}: LoadItemsProps<T, M, L>) => {
  const loaded = useRef(false);
  const modelList = slice.use[`${slice.refName}List` as any]();
  useEffect(() => {
    init && slice.do[`init${Utils.capitalize(slice.refName)}` as any](init);
  }, []);
  useEffect(() => {
    if (modelList === "loading" || loaded.current) return;
    loaded.current = true;
    onLoad?.(modelList);
  }, [modelList, onLoad]);
  return noDiv ? (
    modelList === "loading" ? (
      loading ?? null
    ) : modelList.filter(filter).length ? (
      modelList.filter(filter).map((model, idx) => renderItem(model, idx))
    ) : renderEmpty ? (
      renderEmpty()
    ) : null
  ) : (
    <div
      className={twMerge(
        className,
        modelList === "loading" || !modelList.filter(filter).length ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-1" : ""
      )}
    >
      {modelList === "loading"
        ? loading ?? <Skeleton />
        : modelList.filter(filter).length
        ? modelList
            .filter(filter)
            .slice(from ?? 0, to ?? modelList.length + 1)
            .map((model, idx) => <div key={model.id}>{renderItem(model, idx)}</div>)
        : renderEmpty
        ? renderEmpty()
        : null}
    </div>
  );
};
