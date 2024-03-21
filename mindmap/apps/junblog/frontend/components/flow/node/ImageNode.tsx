import { Handle, NodeProps, NodeToolbar, Position, useNodeId, useReactFlow, useStoreApi } from 'reactflow';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useColor, useFlowStore } from '@junblog/frontend/stores/client';
import { motion as m } from 'framer-motion';
import { MdEdit, MdDelete, MdColorLens, MdCheck, MdAdd } from 'react-icons/md';
import { useCustomNode } from '@junblog/frontend/stores/hook';

export type NodeData = {
  label: string;
  size: number;
};

export const ImageNode = ({ id, data, dragging, selected, type, isConnectable }: NodeProps<NodeData>) => {
  const { deleteElements } = useReactFlow();
  const { setNode } = useCustomNode();

  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (selected) {
      setNode(id);
    } else {
      setAdd(false);
    }
  }, [selected, data, setNode, id]);
  return (
    <>
      <NodeToolbar className="top-4 rounded-lg" isVisible={selected} position={Position.Top}>
        <button className="rounded-lg mx-1 border">
          <MdColorLens />
        </button>
        <button
          onClick={() => {
            deleteElements({ nodes: [{ id }] });
          }}
          className="rounded-lg mx-1 border"
        >
          <MdDelete />
        </button>
        <button onClick={() => console.log('TEST')} className="rounded-lg mx-1 border">
          <MdEdit />
        </button>
        <button onClick={() => setAdd(!add)} className="rounded-lg mx-1 border">
          {add ? <MdCheck /> : <MdAdd />}
        </button>
      </NodeToolbar>

      <m.div
        className={`custom-node dragHandle p-2 ${selected && 'clicked'}`}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 },
        }}
        whileTap={{ scale: 0.9 }}
        style={{ fontSize: `${data.size}px` }}
      >
        <div className="flex items-center image-node">
          <img className="h-[100%]" src="/logo2.png" height="100%" />
        </div>
      </m.div>
      <Handle className={`${add && 'add'}`} type="target" position={Position.Top} isConnectable={isConnectable} />
      <Handle className={`${add && 'add'}`} type="source" position={Position.Top} isConnectable={isConnectable} />
    </>
  );
};
