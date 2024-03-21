import { Excalidraw } from '@excalidraw/excalidraw';
import { ExcalidrawElement, NonDeletedExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { useFlowStore } from '@junblog/frontend/stores/client';
import { useApi } from '@junblog/frontend/stores/server';
import { useEffect, useRef, useState } from 'react';
import { PacmanLoader } from 'react-spinners';

const theme = (bgColor: string) => {
  if (!bgColor) return 'light';
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? 'light' : 'dark';
};
const file = [
  {
    // created: 1709315045590,
    dataURL: 'https://velog.velcdn.com/images/doheek2/post/422cdef1-736c-4809-b14c-61c6715f385d/image.png',
    id: '8350dfdd36e4eb99be2aff024a677b27d7828699',
    // lastRetrieved: 1709315045590,
    mimeType: 'image/png',
  },
];

interface DrawViewProps {
  view?: boolean;
  data?: any;
}

export const DrawView = ({ view = false, data }: DrawViewProps) => {
  const set = useRef(new Set());
  const temp = useRef<any>(null);
  const checking = useRef(false);
  const color = useFlowStore((state) => state.user).color;
  const currentNode = useFlowStore((state) => state.currentNode);
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const update = useApi.useUpdateDraw();
  const addFile = useApi.useAddFile();
  useEffect(() => {
    temp.current = null;
    if (!view && currentNode) {
      if (excalidrawAPI) {
        set.current = new Set((data?.files || []).map((file) => file.id));
        excalidrawAPI.addFiles(data?.files || []);
        const interval = setInterval(async () => {
          const elements = excalidrawAPI.getSceneElements();
          temp.current = elements;
          elements && elements.length > 0 && update.mutate({ elements, current: currentNode });
        }, 5000);
        return () => {
          temp.current && temp.current.length > 0 && update.mutate({ elements: temp.current, current: currentNode });
          clearInterval(interval);
        };
        // }
      }
    }
  }, [currentNode, view, excalidrawAPI]);

  return (
    <div className="h-full">
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={{
          elements: data?.elements || [],
          appState: { viewBackgroundColor: '#0000', viewModeEnabled: view, zenModeEnabled: !view },
        }}
        theme={theme(color.contentBg)}
        UIOptions={{
          canvasActions: {
            changeViewBackgroundColor: false,
          },
        }}
        onChange={(elements, appState, files) => {
          if (checking.current) return;
          checking.current = true;
          Object.keys(files).forEach((key) => {
            const init = set.current.size;
            if (set.current.add(key).size > init) {
              addFile.mutate(files[key]);
            }
          });
          checking.current = false;
        }}
      />
    </div>
  );
};
