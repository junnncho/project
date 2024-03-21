import { Ani } from '@junblog/frontend/components/common';
import { Node, useOnSelectionChange, useReactFlow, useStoreApi } from 'reactflow';
import { useCallback, useEffect, useState } from 'react';
import { useColor, useFlowStore, useModalStore } from '@junblog/frontend/stores/client';
import { useCustomFlow } from '@junblog/frontend/stores/hook';
import { isMobile } from 'react-device-detect';

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const zoomSize = (node?: Node) => {
  if (node) {
    const zoom = node?.data?.size && isMobile ? 3 / node.data.size : node?.data?.size ? 5 / node.data.size : 0.1;
    return { maxZoom: zoom, minZoom: zoom };
  }
  return { maxZoom: 0.1, minZoom: 0.1 };
};

export const CustomBottomLeft = ({ color }) => {
  const { fitView, getNode } = useReactFlow();
  const getChildNodes = useFlowStore((state) => state.getChildNodes);
  const setModal = useModalStore((state) => state.setModal);
  const { selectNode } = useCustomFlow();
  const [nodes, setNodes] = useState<Node[]>([]);
  const setNode = useFlowStore((state) => state.setNode);
  const [parent, setParent] = useState<Node | null>(null);

  useEffect(() => {
    setNodes(getChildNodes());
  }, [getChildNodes]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setNodes(getChildNodes(nodes?.[0]?.id));
      if (!nodes || nodes.length === 0) {
        setNode();
      }
      if (nodes?.[0]?.parentNode) {
        const tempNode = getNode(nodes[0].parentNode);
        if (tempNode) {
          setParent(tempNode);
          return;
        }
      }
      setParent(null);
    },
  });
  const changeView = useCallback(
    (node: Node) => {
      console.log('VIEW', node);
      fitView({ nodes: [node], duration: 500, ...zoomSize(node) });
      selectNode(node);
    },
    [fitView]
  );

  const changeHome = useCallback(() => {
    fitView({ duration: 500 });
    selectNode();
  }, [fitView]);

  return (
    <div className={isMobile ? 'mobile-x-scroll' : 'w-full'}>
      <Ani.ButtonX
        className={`${color} control-node new parent ${!parent && 'disabled'}`}
        onClick={() => (parent ? changeView(parent) : changeHome())}
      >
        {parent ? 'Parent' : 'Home'}
      </Ani.ButtonX>
      {nodes.map((node) => (
        <Ani.ButtonX className={`${color} control-node new`} onClick={() => changeView(node)} key={node.id}>
          {node.data.label}
        </Ani.ButtonX>
      ))}
    </div>
  );
};

export const CustomTopLeft = ({ color }) => {
  const { screenToFlowPosition } = useReactFlow();
  const addRoot = useFlowStore((state) => state.addRoot);
  const store = useStoreApi();
  const { domNode } = store.getState();
  const { selectNode } = useCustomFlow();

  const onClick = useCallback(
    (event) => {
      if (!domNode) return;
      const { width, height, top, left } = domNode.getBoundingClientRect();
      const position = screenToFlowPosition({
        x: left + width / 2,
        y: top + height / 2,
      });
      const newNode = addRoot(position);
      setTimeout(() => {
        selectNode(newNode);
      }, 100);
    },
    [domNode, selectNode]
  );

  return (
    <>
      <Ani.ButtonY
        className={`${color} control-node new`}
        onDragStart={(event) => onDragStart(event, 'input')}
        onClick={onClick}
        draggable
      >
        New
      </Ani.ButtonY>
    </>
  );
};
