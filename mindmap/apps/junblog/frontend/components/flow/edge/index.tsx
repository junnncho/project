import { BaseEdge, EdgeProps, getStraightPath, Edge, useReactFlow } from 'reactflow';
import { FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useColor, useFlowStore } from '@junblog/frontend/stores/client';

const CircleMotion = ({ dist, path, size, color }) => {
  const num = Math.floor(dist / (size * 5));
  return (
    <>
      {Array.from({ length: num }, (_, i) => {
        return (
          <circle key={`circle-${i}`} r={size / 2.6 || 10} fill={color} className="circle">
            <animateMotion dur={`${num}s`} begin={`${i}s`} repeatCount="indefinite" path={path} />
          </circle>
        );
      })}
    </>
  );
};

function MindMapEdge(props: EdgeProps) {
  const { getNode } = useReactFlow();
  const node = getNode(props.source);
  const { sourceX, sourceY, targetX, targetY, data } = props;
  const editSourceY = node?.data?.size ? sourceY + node.data.size * 6 : data?.size ? sourceY + data.size * 6 : sourceY;
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY: editSourceY,
    targetX,
    targetY,
  });
  const { edge } = useFlowStore((state) => state.user).color;
  const distance = Math.sqrt((targetX - sourceX) ** 2 + (targetY - sourceY) ** 2);
  return (
    <>
      <BaseEdge
        path={edgePath}
        {...props}
        style={{
          strokeWidth: data?.size ? data.size / 1.6 : 6,
          stroke: data?.private ? '#696969' : edge,
          opacity: 0.6,
        }}
      />
      <CircleMotion dist={distance} path={edgePath} size={data?.size} color={data?.private ? '#black' : edge} />
    </>
  );
}

export default MindMapEdge;
