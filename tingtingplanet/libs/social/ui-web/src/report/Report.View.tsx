import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { Dropdown, RecentTime } from "@shared/ui-web";
import { Modal } from "antd";
import { gql, slice, st, usePage } from "@social/data-access";
import { useRouter } from "next/navigation";
import React from "react";

interface ReportViewProps {
  report: gql.Report;
  self?: gql.shared.User;
  slice?: slice.ReportSlice;
}
export const ReportView = ({ report, slice = st.slice.report, self }: ReportViewProps) => {
  const router = useRouter();
  const { l } = usePage();

  return (
    <div>
      <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
        <h3>{report.title}</h3>
        <div className="flex">
          <Dropdown
            className="mb-10"
            value={<AiOutlineMore />}
            buttonClassName="btn btn-outline"
            content={
              self?.id === report.from.id ? (
                <div className="flex flex-col gap-1">
                  <button
                    className="flex gap-1 flex-nowrap btn btn-sm btn-ghost"
                    onClick={() => st.do.goto(`/report/${report.id}/edit`)}
                  >
                    <AiOutlineEdit />
                    {l("main.edit")}
                  </button>
                  <button
                    className="flex gap-1 text-red-500 btn btn-sm btn-ghost flex-nowrap"
                    onClick={() =>
                      Modal.confirm({
                        icon: <AiOutlineDelete />,
                        content: `${l("main.removeMsg")}`,
                        onOk: () => {
                          Modal.confirm({
                            icon: <AiOutlineDelete />,
                            content: `${l("main.removeMsg")}`,
                            onOk: () => router.push(`/report`),
                          });
                        },
                      })
                    }
                  >
                    <AiOutlineDelete />
                    {l("main.remove")}
                  </button>
                </div>
              ) : (
                <div></div>
              )
            }
          />
        </div>
      </div>
      <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
        <div>{report.from.nickname}</div>
        <RecentTime
          date={report.createdAt}
          breakUnit="second"
          timeOption={{ dateStyle: "short", timeStyle: "short" }}
        />
      </div>
      <div className="p-6 border border-gray-200 view-report" dangerouslySetInnerHTML={{ __html: report.content }} />
      {report.status === "resolved" && report.replyFrom && (
        <>
          <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
            <div>{report.replyFrom?.accountId}</div>
            <RecentTime
              date={report.replyAt}
              breakUnit="second"
              timeOption={{ dateStyle: "short", timeStyle: "short" }}
            />
          </div>
          <div
            className="p-6 border border-gray-200 view-report"
            dangerouslySetInnerHTML={{ __html: report.replyContent ?? "" }}
          ></div>
        </>
      )}
    </div>
  );
};
