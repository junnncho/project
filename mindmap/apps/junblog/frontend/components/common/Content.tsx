import { PacmanLoader } from 'react-spinners';
import { useApi } from '@junblog/frontend/stores/server';
import { useEffect, useState } from 'react';
import { useFlowStore, useModalStore } from '@junblog/frontend/stores/client';
// import { Draw, Text } from '@junblog/frontend/components';
import { Ani, Loading } from '.';
import { DeleteModal } from '../flow';
import { DrawView } from '../draw/Draw.View';
import { EditorView } from '../editor/Editor.View';
import { TextView } from '@junblog/frontend/components/text/Text.View';

interface ContentProps {
  view?: boolean;
  id?: string;
}

export const Content = ({ view = false, id }: ContentProps) => {
  const getText = useApi.useGetText(id);
  const getDraw = useApi.useGetDraw(id);
  const currentNode = useFlowStore((state) => state.currentNode);
  const color = useFlowStore((state) => state.user).color;
  const modal = useModalStore((state) => state.modal);
  const [add, setAdd] = useState<'text' | 'draw' | null>(null);

  useEffect(() => {
    setAdd(null);
  }, [currentNode]);

  return (
    <>
      {modal === 'delete' && !view ? (
        <DeleteModal />
      ) : getText.isFetching || getDraw.isFetching ? (
        <Loading.Packman color={color.edge} text="Loading" />
      ) : // <div className="flex justify-center items-center h-full">
      //   <PacmanLoader color={color.mainNode}  size={50}/>
      // </div>
      !currentNode?.id ? (
        <Loading.Packman color={color.edge} text="Choose Node" />
      ) : getText.isError && getDraw.isError && !add ? (
        <>
          {!view && (
            <div className="flex mt-4">
              <Ani.ButtonY duration={0.2} className="w-1/2 choice-button m-4" onClick={() => setAdd('text')}>
                Text
              </Ani.ButtonY>
              <Ani.ButtonY duration={0.2} className="w-1/2 choice-button m-4" onClick={() => setAdd('draw')}>
                Draw
              </Ani.ButtonY>
            </div>
          )}
          {view ? (
            <Loading.Packman color={color.edge} text="Nothing" />
          ) : (
            <Loading.Packman color={color.edge} text="Choose One" />
          )}
        </>
      ) : getText.isSuccess || add === 'text' ? (
        <EditorView view={view} data={getText.data} />
      ) : getDraw.isSuccess || add === 'draw' ? (
        <DrawView view={view} data={getDraw.data} />
      ) : (
        <Loading.Packman color="red" text="Error..." />
      )}
    </>
  );
};
export default Content;
