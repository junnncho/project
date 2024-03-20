import { AiOutlineCheckCircle, AiOutlineNumber } from "react-icons/ai";
import { Editor, Modal, RecentTime } from "@shared/ui-web";
import { gql, slice, st } from "@social/data-access";
interface ProcessProps {
  slice?: slice.ReportSlice;
  report: gql.LightReport;
  idx?: number;
}
export const Process = ({ slice = st.slice.report, report, idx }: ProcessProps) => {
  return (
    <button className="gap-2 btn btn-sm" onClick={() => slice.do.processReport(report.id, idx)}>
      <AiOutlineNumber />
      Process
    </button>
  );
};

interface ResolveProps {
  slice?: slice.ReportSlice;
  report: gql.LightReport;
  idx?: number;
}
export const Resolve = ({ slice = st.slice.report, report, idx }: ResolveProps) => {
  const reportForm = slice.use.reportForm();
  const reportModal = slice.use.reportModal();
  return (
    <>
      <button
        className="gap-2 btn btn-primary btn-sm"
        onClick={() => slice.do.editReport(report.id, { modal: `resolve-${report.id}` })}
      >
        <AiOutlineCheckCircle />
        Resolve
      </button>

      <Modal
        key={report.id}
        width="80%"
        open={reportModal === `resolve-${report.id}`}
        onCancel={() => slice.do.resetReport()}
        onOk={() => slice.do.resolveReport(report.id, idx)}
        okButtonProps={{
          disabled: (reportForm.replyContent?.length ?? 0) < 10,
        }}
      >
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>{report.title}</h3>
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
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>Reply</h3>
        </div>
        <Editor
          addFile={slice.do.addFilesOnReport}
          addFilesGql={gql.addReportFiles}
          onChange={slice.do.setReplyContentOnReport}
          defaultValue={reportForm.replyContent ?? ""}
        />
      </Modal>
    </>
  );
};
