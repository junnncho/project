import { Handle, NodeProps, Position } from 'reactflow';

import { motion as m } from 'framer-motion';
import { useColor, useFlowStore } from '@junblog/frontend/stores/client';

export type NodeData = {
  label: string;
  size: number;
};

export const MasterColorNode = ({ id, data, dragging, selected, type, isConnectable }: NodeProps<NodeData>) => {
  const color = useFlowStore((state) => state.user).color;
  const setColor = useFlowStore((state) => state.setColor);
  return (
    <>
      <m.div
        className={`main-node custom-node dragHandle p-2 ${selected && 'clicked'}`}
        whileTap={{ scale: 0.9 }}
        style={{ fontSize: `${data.size}px` }}
      >
        <div className="input-node inline">{data.label}</div>
        <div className="flex items-center px-[2em]">
          <span className="text-[4em]">Node</span>
          <input
            className="nodrag color-button ml-auto"
            type="color"
            onChange={(e) => setColor('mainNode', e.target.value)}
            defaultValue={color.mainNode || '#000000'}
          />
        </div>
        <div className="flex items-center px-[2em]">
          <span className="text-[4em]">Edge</span>
          <input
            className="nodrag color-button ml-auto"
            type="color"
            onChange={(e) => setColor('edge', e.target.value)}
            defaultValue={color.edge || '#000000'}
          />
        </div>
        <div className="flex items-center px-[2em]">
          <span className="text-[4em]">MindMap</span>
          <input
            className="nodrag color-button ml-auto"
            type="color"
            onChange={(e) => setColor('flowBg', e.target.value)}
            defaultValue={color.flowBg || '#000000'}
          />
        </div>
        <div className="flex items-center px-[2em]">
          <span className="text-[4em]">Content</span>
          <input
            className="nodrag color-button ml-auto"
            type="color"
            onChange={(e) => setColor('contentBg', e.target.value)}
            defaultValue={color.contentBg || '#000000'}
          />
        </div>
      </m.div>

      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      {/* <Handle type="source" position={Position.Top} isConnectable={isConnectable} /> */}
    </>
  );
};

// export const ChangeMainNode = ({ id, data, dragging, selected, type, isConnectable }: NodeProps<NodeData>) => {
//   const setColor = useFlowStore((state) => state.setColor);
//   const { main } = useColor();

//   return (
//     <>
//       <m.div
//         className={`${main} custom-node dragHandle p-2 ${selected && 'clicked'}`}
//         whileHover={{
//           scale: 1.1,
//           transition: { duration: 0.1 },
//         }}
//         whileTap={{ scale: 0.9 }}
//         style={{ fontSize: `${data.size}px` }}
//       >
//         <div className="input-node inline">{data.label}</div>
//         <div className="flex">
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('main', 1);
//             }}
//           >
//             1
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('main', 2);
//             }}
//           >
//             2
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('main', 3);
//             }}
//           >
//             3
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('main', 4);
//             }}
//           >
//             4
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('main', 5);
//             }}
//           >
//             5
//           </button>
//         </div>
//       </m.div>

//       <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
//       <Handle type="source" position={Position.Top} isConnectable={isConnectable} />
//     </>
//   );
// };

// export const ChangeBgNode = ({ id, data, dragging, selected, type, isConnectable }: NodeProps<NodeData>) => {
//   const setColor = useFlowStore((state) => state.setColor);
//   const { main } = useColor();

//   return (
//     <>
//       <m.div
//         className={`${main} custom-node dragHandle p-2 ${selected && 'clicked'}`}
//         whileHover={{
//           scale: 1.1,
//           transition: { duration: 0.1 },
//         }}
//         whileTap={{ scale: 0.9 }}
//         style={{ fontSize: `${data.size}px` }}
//       >
//         <div className="input-node inline">{data.label}</div>
//         <div className="flex">
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('bg', 1);
//             }}
//           >
//             1
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('bg', 2);
//             }}
//           >
//             2
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('bg', 3);
//             }}
//           >
//             3
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('bg', 4);
//             }}
//           >
//             4
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('bg', 5);
//             }}
//           >
//             5
//           </button>
//         </div>
//       </m.div>

//       <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
//       <Handle type="source" position={Position.Top} isConnectable={isConnectable} />
//     </>
//   );
// };

// export const ChangeEdgeNode = ({ id, data, dragging, selected, type, isConnectable }: NodeProps<NodeData>) => {
//   const setColor = useFlowStore((state) => state.setColor);
//   const { main } = useColor();

//   return (
//     <>
//       <m.div
//         className={`${main} custom-node dragHandle p-2 ${selected && 'clicked'}`}
//         whileHover={{
//           scale: 1.1,
//           transition: { duration: 0.1 },
//         }}
//         whileTap={{ scale: 0.9 }}
//         style={{ fontSize: `${data.size}px` }}
//       >
//         <div className="input-node inline">{data.label}</div>
//         <div className="flex">
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('edge', 1);
//             }}
//           >
//             1
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('edge', 2);
//             }}
//           >
//             2
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('edge', 3);
//             }}
//           >
//             3
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('edge', 4);
//             }}
//           >
//             4
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('edge', 5);
//             }}
//           >
//             5
//           </button>
//         </div>
//       </m.div>

//       <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
//       <Handle type="source" position={Position.Top} isConnectable={isConnectable} />
//     </>
//   );
// };

// export const ChangeTxtNode = ({ data, selected, isConnectable }: NodeProps<NodeData>) => {
//   const setColor = useFlowStore((state) => state.setColor);
//   const { main } = useColor();

//   return (
//     <>
//       <m.div
//         className={`${main} custom-node dragHandle p-2 ${selected && 'clicked'}`}
//         whileHover={{
//           scale: 1.1,
//           transition: { duration: 0.1 },
//         }}
//         whileTap={{ scale: 0.9 }}
//         style={{ fontSize: `${data.size}px` }}
//       >
//         <div className="input-node inline">{data.label}</div>
//         <div className="flex">
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('txt', 1);
//             }}
//           >
//             1
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('txt', 2);
//             }}
//           >
//             2
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('txt', 3);
//             }}
//           >
//             3
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('txt', 4);
//             }}
//           >
//             4
//           </button>
//           <button
//             className="color-button"
//             onClick={() => {
//               setColor('txt', 5);
//             }}
//           >
//             5
//           </button>
//         </div>
//       </m.div>

//       <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
//       <Handle type="source" position={Position.Top} isConnectable={isConnectable} />
//     </>
//   );
// };
