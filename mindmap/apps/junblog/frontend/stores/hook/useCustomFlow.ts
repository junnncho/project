import { useFlowStore } from '@junblog/frontend/stores/client';
import { use, useCallback } from 'react';
import { useStoreApi, Node, Edge } from 'reactflow';

const getConnectedEdges = (nodeIds: string[], edges: Edge[]) => {
  return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target));
};

export const useCustomFlow = () => {
  const store = useStoreApi();
  const changeNodesStatus = useFlowStore((state) => state.changeNodesStatus);
  const changeStatus = useCallback((nodeId: string, status: boolean) => {
    const { getNodes, edges } = store.getState();
    let parentId: string | undefined;
    const nodesToChange = getNodes().reduce(
      (res: [string[], string[]], node) => {
        const parentHit = !(nodeId === node.id) && node?.parentNode && res[0].find((n) => n === node?.parentNode);
        if (nodeId === node.id) {
          parentId = node?.parentNode;
          res[0].push(node.id);
        } else if (parentHit) {
          res[0].push(node.id);
        } else {
          if (node?.data?.private) {
            res[1].push(node.id);
          }
        }
        return res;
      },
      [[], []]
    );
    if (parentId && nodesToChange[1].includes(parentId)) return;
    const connectedEdges = getConnectedEdges(nodesToChange[0], edges);
    const edgesToChange = connectedEdges.reduce((res: string[], edge) => {
      if (!res.includes(edge.id)) {
        res.push(edge.id);
      }
      return res;
    }, []);
    if (nodesToChange[0] && nodesToChange[0].length > 0) {
      changeNodesStatus(status, nodesToChange[0], edgesToChange);
    }
  }, []);
  const selectNode = useCallback((node?: Node) => {
    const { addSelectedNodes } = store.getState();

    store.setState({ nodesSelectionActive: false });

    if (node && !node.selected) {
      addSelectedNodes([node.id]);
    } else {
      addSelectedNodes([]);
    }
    // else if (unselect || (node.selected && multiSelectionActive)) {
    //     unselectNodesAndEdges({ nodes: [node], edges: [] });
    //     requestAnimationFrame(() => nodeRef?.current?.blur());
    // }
  }, []);
  return { changeStatus, selectNode };
};
