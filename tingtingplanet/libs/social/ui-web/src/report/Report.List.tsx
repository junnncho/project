import * as Report from ".";
import { DataListContainer, DataTableList, DataViewModal, RecentTime } from "@shared/ui-web";
import { ModelsProps, pageMap } from "@shared/util-client";
import { StatusTag } from "@shared/ui-web/common/layout/DataColumn";
import { gql, slice, st, usePage } from "@social/data-access";
import { useRouter } from "next/navigation";

export const ReportList = ({ slice = st.slice.report, init }: ModelsProps<slice.ReportSlice, gql.Report>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Report.Item}
      renderDashboard={Report.Stat}
      queryMap={gql.reportQueryMap}
      type="list"
      view={({ report }: { report: gql.Report }) => (
        <DataViewModal slice={slice} renderTitle={(report: gql.Report) => `Report - ${report.title}`}>
          <Report.View report={report} slice={slice} />
        </DataViewModal>
      )}
      columns={[
        "title",
        "type",
        "createdAt",
        {
          key: "replyFrom",
          render: (replyFrom?: gql.shared.LightAdmin) => replyFrom?.accountId ?? "",
        },
        "status",
      ]}
      actions={(report: gql.LightReport, idx) => [
        "remove",
        "view",
        ...(report.status === "active"
          ? [
              {
                type: "resolve",
                render: () => <Report.Action.Resolve report={report} idx={idx} slice={slice} />,
              },
              {
                type: "process",
                render: () => <Report.Action.Process report={report} idx={idx} slice={slice} />,
              },
            ]
          : [
              {
                type: "resolve",
                render: () => <Report.Action.Resolve report={report} idx={idx} slice={slice} />,
              },
            ]),
      ]}
    />
  );
};

const ReportListForMe = ({
  className,
  slice = st.slice.report,
  self,
}: {
  className?: string;
  slice?: slice.ReportSlice;
  self: gql.shared.User;
}) => {
  const { l } = usePage();
  const router = useRouter();

  if (!self.id) {
    window.alert(`로그인이 필요합니다.`);
    pageMap.unauthorize();
  }
  return (
    <DataTableList
      className={className}
      slice={slice}
      init={{ query: { from: self.id } }}
      columns={[
        {
          key: l("report.title"),
          render: (_, { title }: gql.LightReport) => title,
        },
        {
          key: l("report.createdAt"),
          render: (_, { createdAt }: gql.LightReport) => <RecentTime date={createdAt} />,
        },
        {
          key: l("report.status"),
          render: (_, { status }: gql.LightReport) => <StatusTag status={status} />,
        },
      ]}
      onItemClick={(report: gql.LightReport) => router.push(`report/${report.id}`)}
    />
  );
};
ReportList.ForMe = ReportListForMe;
