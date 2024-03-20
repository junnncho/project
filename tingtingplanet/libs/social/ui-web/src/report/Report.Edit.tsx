import { Editor } from "@shared/ui-web";
import { gql, slice, st, usePage } from "@social/data-access";

interface ReportEditProps {
  reportId?: string | null;
  slice?: slice.ReportSlice;
}
export const ReportEdit = ({ slice = st.slice.report }: ReportEditProps) => {
  const reportForm = slice.use.reportForm();
  const { l } = usePage();

  return (
    <>
      <div className="flex items-center mb-4">
        <p className="w-20 mt-3">{l("report.title")} </p>
        <input
          className="input input-bordered"
          value={reportForm.title}
          onChange={(e) => slice.do.setTitleOnReport(e.target.value)}
        />
      </div>
      <Editor
        addFile={slice.do.addFilesOnReport}
        addFilesGql={gql.addReportFiles}
        onChange={slice.do.setContentOnReport}
        defaultValue={reportForm.content}
      />
    </>
  );
};
