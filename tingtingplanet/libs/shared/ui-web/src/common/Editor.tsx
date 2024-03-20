"use client";
import { gql } from "@shared/data-access";
import React, { useRef } from "react";
import SunEditorCore from "suneditor/src/lib/core";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

export interface EditorProps {
  addFilesGql: (fileList: FileList, id?: string) => Promise<gql.File[]>;
  addFile: (file: gql.File | gql.File[], options?: { idx?: number; limit?: number }) => void;
  onChange: (content: string) => void;
  defaultValue?: string;
  height?: string;
  defaultStyle?: string;
}

export const Editor = ({
  addFilesGql,
  addFile,
  onChange,
  defaultValue,
  height = "500px",
  defaultStyle = "",
}: EditorProps) => {
  const editor = useRef<SunEditorCore>();

  const options = {
    defaultStyle: defaultStyle,
    buttonList: [
      // ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      // ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike" /** 'subscript', 'superscript' */],
      ["fontColor", "hiliteColor" /** , 'textStyle' */],
      ["codeView"],
      // ["outdent", "indent"],
      ["align", "list", "lineHeight"], // "horizontalRule",
      // '/', // Line break
      ["table", "link", "image", "video" /**'video', 'audio' ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
      /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
      // ["fullScreen", "showBlocks", "codeView"],
      // ["removeFormat"],
      // ['preview', 'print'],
      // ['save', 'template'],
    ],
    // plugins: [plugin],
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    (async () => {
      const [file] = await addFilesGql(files);
      addFile(file);
      const response = {
        result: [
          {
            url: `${file.url}`,
            name: files[0].name,
            size: files[0].size,
          },
        ],
      };
      uploadHandler(response);
    })();
    uploadHandler();
  };

  return (
    <SunEditor
      lang="ko"
      getSunEditorInstance={getSunEditorInstance}
      defaultValue={defaultValue}
      placeholder="Please type here..."
      width="100%"
      height={height}
      setOptions={options}
      setAllPlugins={true}
      onChange={onChange}
      onImageUploadBefore={handleImageUploadBefore}
    />
  );
};
