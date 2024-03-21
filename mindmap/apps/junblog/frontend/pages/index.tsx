import 'editorjs-image/src/index.css';
import { Theme } from '@junblog/frontend/components/common';
import { isMobile } from 'react-device-detect';
import { useApi } from '@junblog/frontend/stores/server';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const FlowView = dynamic(() => import('@junblog/frontend/components/flow/Flow.View'), {
  ssr: false,
});

const Content = dynamic(() => import('@junblog/frontend/components/common/Content'), {
  ssr: false,
});

const dragEventPC = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, ref1, ref2) => {
  const mouseMoveHandler = (e: MouseEvent) => {
    e.stopPropagation();
    // e.preventDefault();
    if (ref1?.current && ref2?.current && e.clientX > 0) {
      ref1.current.style.width = `${document.body.clientWidth - e.clientX}px`;
      ref2.current.style.right = `${document.body.clientWidth - e.clientX}px`;
    }
  };
  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
  };
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler, { once: true });
};
interface IndexProps {
  view?: boolean;
  userId?: string;
}

export function Index({ view = false, userId }: IndexProps) {
  // (window!=== undefined) &&polyfill({ holdToDrag: 0 });
  useApi.useWhoAmI();
  const textDiv = useRef<HTMLDivElement>(null);
  const dragButtonDiv = useRef<HTMLDivElement>(null);
  return (
    <>
      <Theme.ThemeProvider className="flex justify-center h-full">
        {isMobile ? (
          <div className="mainContent flex flex-col-reverse w-full h-full">
            <div ref={textDiv} className={`content-theme w-full px-0 border-t-2 overflow-auto h-3/5 relative`}>
              <Content view={view} id={userId} />
            </div>
            {/* <BsInfoCircle onTouchStart={(e)=>{console.log(e); textDiv.current?.style.height="10px"}}  className="z-100 mx-auto top-[40%] left-1/2 -translate-x-1/2 translate-y-full text-center absolute"/> */}
            <div className="flex-grow">
              <FlowView view={view} id={userId} />
            </div>
          </div>
        ) : (
          <div className="mainContent flex flex-row-reverse w-full h-full">
            <div ref={textDiv} className={`content-theme px-0 border-l-2 overflow-auto h-full relative w-2/5`}>
              {/* <TextView view={false} /> */}
              <Content view={view} id={userId} />
            </div>
            <div
              ref={dragButtonDiv}
              onMouseDown={(e) => dragEventPC(e, textDiv, dragButtonDiv)}
              className="content-theme border-4 w-0 h-7 right-[40%] top-1/2 absolute cursor-col-resize z-50"
            ></div>
            <div className="flex-grow">
              <FlowView view={view} id={userId} />
            </div>
          </div>
        )}
      </Theme.ThemeProvider>
    </>
  );
}

export default Index;
