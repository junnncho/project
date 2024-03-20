import { slice, st, usePage } from "@shared/data-access";

interface FileEditProps {
  fileId?: string | null;
  slice?: slice.FileSlice;
}
export const FileEdit = ({ slice = st.slice.file, fileId = undefined }: FileEditProps) => {
  const fileForm = slice.use.fileForm();
  const { l } = usePage();
  return (
    <div className="flex items-center mb-4">
        <p className="w-20 mt-3">{l("file.url")}</p>
        <input
          className="input input-bordered"
          value={fileForm.url}
          onChange={(e) => slice.do.setUrlOnFile(e.target.value)}
        />
      </div>
  );
};
