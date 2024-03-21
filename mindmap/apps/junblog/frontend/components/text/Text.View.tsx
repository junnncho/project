import { EDITOR_JS_TOOLS } from './Text.Plugin';
import { OutputData, ToolConstructable, ToolSettings } from '@editorjs/editorjs';
import { createReactEditorJS } from 'react-editor-js';
import { useApi } from '@junblog/frontend/stores/server';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useColor, useFlowStore } from '@junblog/frontend/stores/client';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';

interface EditorCore {
  destroy(): Promise<void>;

  clear(): Promise<void>;

  save(): Promise<OutputData>;

  render(data: OutputData): Promise<void>;

  get dangerouslyLowLevelInstance(): any | null;
}
const ReactEditorJS = createReactEditorJS();
interface TextViewProps {
  view?: boolean;
  data?: any;
}
export const TextView = ({ view = true, data }: TextViewProps) => {
  const editorCore = useRef<EditorCore | null>(null);
  const text = useRef<OutputData | null>(null);
  const currentNode = useFlowStore((state) => state.currentNode);
  const update = useApi.useUpdateText();

  useEffect(() => {
    text.current = null;
    if (!view && currentNode) {
      const interval = setInterval(async () => {
        // text.current && update.mutate({ ...text.current, current: currentNode });
      }, 5000);

      return () => {
        // text.current && update.mutate({ ...text.current, current: currentNode });
        clearInterval(interval);
      };
    }
  }, [currentNode, view]);

  const handleInitialize = useCallback(
    (instance: EditorCore) => {
      editorCore.current = instance;
    },
    [text]
  );
  const handleReady = useCallback(() => {
    const editor = editorCore?.current?.dangerouslyLowLevelInstance;
    editor && new Undo({ editor });
    editor && new DragDrop(editor);
  }, [editorCore]);

  const handleSave = useCallback(async () => {
    if (!view && editorCore.current) {
      text.current = await editorCore.current?.save();
    }
  }, [view, editorCore]);
  return (
    <div className="mt-5 text-[17px]">
      <ReactEditorJS
        placeholder={view ? false : `Let's Write in ${currentNode?.data.label || 'Editor'}`}
        onInitialize={handleInitialize}
        readOnly={view}
        onReady={handleReady}
        onChange={handleSave}
        tools={
          EDITOR_JS_TOOLS as {
            [toolName: string]: ToolConstructable | ToolSettings;
          }
        }
        inlineToolbar={true}
        tunes={['indentTune', 'textVariant', 'anyTuneName']}
        defaultValue={data}
      />
    </div>
  );
};

export default TextView;
