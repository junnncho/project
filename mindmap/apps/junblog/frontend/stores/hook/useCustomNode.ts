import { useReactFlow } from 'reactflow';
import { useFlowStore } from '../client';

export const useCustomNode = () => {
  const setNodeFlow = useFlowStore((state) => state.setNode);
  const { getNode } = useReactFlow();
  const setNode = (id: string) => {
    const node = getNode(id);
    setNodeFlow(getNode(id));
    return node;
  };
  return { setNode };
};
