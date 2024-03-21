import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Node, NodeProps, NodeToolbar, Position, useReactFlow } from 'reactflow';

import { Ani } from '@junblog/frontend/components/common';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdAdd, MdArrowDownward, MdArrowUpward, MdCheck, MdDelete, MdEdit } from 'react-icons/md';
import { isMobile } from 'react-device-detect';
import { useCustomFlow, useCustomNode } from '@junblog/frontend/stores/hook';
import { useFlowStore, useModalStore } from '@junblog/frontend/stores/client';
import { LongPressEventType, useLongPress } from 'use-long-press';

export type NodeData = {
  label: string;
  size: number;
  private?: boolean;
};

interface CustomToolbarProps {
  props: NodeProps<NodeData>;
  inputRef?: React.RefObject<HTMLInputElement>;
  children?: React.ReactNode;
}

const zoomSize = (node?: Node) => {
  if (node) {
    const zoom = node?.data?.size && isMobile ? 3 / node.data.size : node?.data?.size ? 5 / node.data.size : 0.1;
    return { maxZoom: zoom, minZoom: zoom };
  }
  return { maxZoom: 0.1, minZoom: 0.1 };
};

export const CustomToolbarBottom = ({ props }: CustomToolbarProps) => {
  const { screenToFlowPosition } = useReactFlow();
  const updateNodeSize = useFlowStore((state) => state.updateNodeSize);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<any>(null);

  const dragEventPC = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      // e.preventDefault();
      const { x, y } = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const mouseMoveHandler = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const target = screenToFlowPosition({ x: e.clientX, y: e.clientY });
        updateNodeSize(props.id, Math.floor((target.y - y) / 4.14 + props.data.size));
      };
      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    },
    [props.data.size, screenToFlowPosition]
  );

  const eventMobile = useLongPress(
    (e, m) => {
      setElapsedTime(props.data.size);
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + (m.context as number));
      }, 50);
    },
    {
      onCancel: () => clearInterval(timerRef.current),
      onFinish: () => clearInterval(timerRef.current),
      captureEvent: true,
    }
  );

  useEffect(() => {
    if (elapsedTime > 0) {
      updateNodeSize(props.id, elapsedTime);
    }
  }, [elapsedTime, updateNodeSize]);

  return (
    <>
      {props.isConnectable && (
        <NodeToolbar className="-top-4" isVisible={props.selected} position={Position.Bottom}>
          {isMobile ? (
            <>
              <Ani.ButtonYEnlarge {...eventMobile(1)} className="node-config-btn edge-node mobile">
                <MdArrowUpward />
              </Ani.ButtonYEnlarge>
              <Ani.ButtonYEnlarge {...eventMobile(-1)} className="node-config-btn edge-node mobile">
                <MdArrowDownward />
              </Ani.ButtonYEnlarge>
            </>
          ) : (
            <Ani.ButtonYEnlarge onMouseDownCapture={dragEventPC} className="node-config-btn edge-node">
              <MdArrowDownward />
            </Ani.ButtonYEnlarge>
          )}
        </NodeToolbar>
      )}
    </>
  );
};

export const CustomToolbarLock = ({ props, children }: CustomToolbarProps) => {
  const { setNode } = useCustomNode();
  const { fitView } = useReactFlow();
  const [thisNode, setThisNode] = useState<Node | undefined>(undefined);
  const setModal = useModalStore((state) => state.setModal);
  useEffect(() => {
    if (props.selected) {
      setThisNode(setNode(props.id));
      setModal();
    }
  }, [props.selected, props.id]);

  const changeView = useCallback(() => {
    console.log('CHNGE', thisNode);
    thisNode && fitView({ nodes: [thisNode], duration: 500, ...zoomSize(thisNode) });
  }, [thisNode, fitView]);
  return (
    <>
      <div style={{ fontSize: `${props.data.size}px` }} onPointerUp={changeView} onTouchEnd={changeView}>
        {children}
      </div>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Handle type="source" position={Position.Top} isConnectable={false} />
    </>
  );
};

export const CustomToolbarTop = ({ props, inputRef, children }: CustomToolbarProps) => {
  const { deleteElements, fitView } = useReactFlow();
  const { changeStatus } = useCustomFlow();
  const [add, setAdd] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { setNode } = useCustomNode();
  const [thisNode, setThisNode] = useState<Node | undefined>(undefined);
  const setModal = useModalStore((state) => state.setModal);
  const mobile = isMobile ? 'mobile' : '';
  useEffect(() => {
    console.log('CHECK');
    if (props.selected) {
      setThisNode(setNode(props.id));
      if (document) {
        document.querySelector('.clicked') && (document.querySelector('.clicked') as HTMLElement).focus();
      }
      setModal();
    } else {
      setAdd(false);
    }
  }, [props.selected, props.data.private, props.id]);

  // useEffect(() => {
  //   console.log('CHECK');
  //   if (props.selected) {
  //     console.log('selected', props.id);
  //     setThisNode(setNode(props.id));
  //     setModal();
  //   }
  // }, [props.selected]);

  const changeView = useCallback(() => {
    console.log('CHNGE', thisNode);
    thisNode && fitView({ nodes: [thisNode], duration: 500, ...zoomSize(thisNode) });
  }, [thisNode, fitView]);
  return (
    <div>
      {props.isConnectable && (
        <NodeToolbar className="top-4 rounded-lg" isVisible={props.selected} position={Position.Top}>
          {!add && (
            <>
              <Ani.ButtonY
                onClick={() => changeStatus(props.id, !props.data?.private)}
                className={`node-config-btn edge-node ${mobile}`}
              >
                {props.data?.private ? <BsEyeSlash /> : <BsEye />}
              </Ani.ButtonY>
              <Ani.ButtonY
                onClick={() => {
                  setModal('delete');
                }}
                className={`node-config-btn edge-node ${mobile}`}
              >
                <MdDelete />
              </Ani.ButtonY>
              <Ani.ButtonY
                onClick={() => inputRef && inputRef.current?.focus({ preventScroll: true })}
                className={`node-config-btn edge-node ${mobile}`}
              >
                <MdEdit />
              </Ani.ButtonY>
            </>
          )}

          <Ani.ButtonY onClick={() => setAdd(!add)} className={`node-config-btn edge-node ${mobile}`}>
            {add ? <MdCheck /> : <MdAdd />}
          </Ani.ButtonY>
        </NodeToolbar>
      )}
      <div
        onKeyDown={(e) => {
          console.log('KEY', e);
          if (e.key === 'Delete' || e.key === 'Backspace') {
            e.stopPropagation();
            setModal('delete');
          }
        }}
        ref={divRef}
        style={{ fontSize: `${props.data.size}px` }}
        onPointerUp={changeView}
        onTouchEnd={changeView}
      >
        {children}
      </div>
      <Handle
        className={`${add && 'add'} ${isMobile && 'mobile'}`}
        type="target"
        position={Position.Top}
        isConnectable={props.isConnectable}
      />
      <Handle
        className={`${add && 'add'} ${isMobile && 'mobile'}`}
        type="source"
        position={Position.Top}
        isConnectable={props.isConnectable}
      />
    </div>
  );
};
