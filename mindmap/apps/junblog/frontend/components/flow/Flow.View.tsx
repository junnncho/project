import { isMobile } from 'react-device-detect';
import { shallow } from 'zustand/shallow';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  ConnectionLineType,
  Node,
  NodeOrigin,
  OnConnectEnd,
  OnConnectStart,
  Panel,
  useReactFlow,
  useStoreApi,
} from 'reactflow';

import { useFlowStore, FlowStore, useColor, useMeStore } from '@junblog/frontend/stores/client';
import MindMapEdge from './edge';
import { InputNode, ImageNode, ColorNode, LoginNode, TextNode, LogoNode } from './node';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';
import { CustomBottomLeft, CustomTopLeft } from './panel';
import { useApi } from '@junblog/frontend/stores/server';
import { PacmanLoader } from 'react-spinners';
import { useCustomFlow } from '@junblog/frontend/stores/hook';

const selector = (state: FlowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  addRoot: state.addRoot,
  addEdge: state.addEdge,
  getChildNodes: state.getChildNodes,
  // updateFlows: state.updateFlows,
  // loadFlows: state.loadFlows,
});

const nodeTypes = {
  normal: InputNode,
  color: ColorNode.MasterColorNode,
  // color_main: ColorNode.ChangeMainNode,
  // color_bg: ColorNode.ChangeBgNode,
  // color_edge: ColorNode.ChangeEdgeNode,
  // color_txt: ColorNode.ChangeTxtNode,
  text: TextNode,
  image: LogoNode,
  login: LoginNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];

interface Position {
  x: number;
  y: number;
}
interface FlowViewProps {
  view?: boolean;
  id?: string;
}

export const FlowView = ({ view = true, id }: FlowViewProps) => {
  const store = useStoreApi();
  const { edge } = useColor();
  const connectingNodeId = useRef<string | null>(null);
  const nickname = useMeStore((state) => state.nickname);
  const { selectNode } = useCustomFlow();
  const connectionLineStyle = { stroke: edge, strokeWidth: 8 };
  const color = useFlowStore((state) => state.user).color;
  const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };
  const get = useApi.useLoadFlow(id);
  const update = useApi.useUpdateFlow();
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode, addRoot, addEdge } = useFlowStore(
    selector,
    shallow
  );
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    if (nickname && !view) {
      // load.refetch();
      const interval = setInterval(async () => {
        update.mutate(undefined);
      }, 5000);

      return () => {
        update.mutate(undefined);
        clearInterval(interval);
      };
    }
  }, [nickname, view]);

  const getChildNodePosition = useCallback(
    (event: Position, parentNode?: Node) => {
      if (!parentNode?.positionAbsolute || !parentNode?.width || !parentNode?.height) {
        return;
      }
      const panePosition = screenToFlowPosition({
        x: event.x,
        y: event.y,
      });
      return {
        x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
        y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
      };
    },
    [screenToFlowPosition]
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = addRoot({ x: position.x, y: position.y });
      setTimeout(() => selectNode(newNode), 100);
      // selectNode(newNode);
      console.log('SELECT', newNode);
    },
    [screenToFlowPosition, addRoot, selectNode]
  );

  const onConnectStart: OnConnectStart = useCallback((e, { nodeId }) => {
    // we need to remember where the connection started so we can add the new node to the correct parent on connect end
    connectingNodeId.current = nodeId;
    document?.querySelector?.('.react-flow__connection')?.setAttribute?.('style', 'display:block');
    // alert("START");
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      document?.querySelector?.('.react-flow__connection')?.setAttribute?.('style', 'display:none');
      const { nodeInternals, addSelectedNodes } = store.getState();
      let position: Position;
      let target: Element | null;
      if (isMobile) {
        const changed = (event as TouchEvent).changedTouches[0];
        position = { x: changed.clientX, y: changed.clientY };
        target = document.elementFromPoint(changed.clientX, changed.clientY);
      } else {
        position = {
          x: (event as MouseEvent).clientX,
          y: (event as MouseEvent).clientY,
        };
        target = event.target as Element;
      }
      if (!position || !target) return;

      const targetIsPane = target.classList.contains('react-flow__pane');
      const node = target.closest('.react-flow__node');

      if (node) {
        const to = node.getAttribute('data-id');
        const from = connectingNodeId.current;
        to && from && addEdge(from, to);
        // node.querySelector("input")?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(position, parentNode);

        if (parentNode && childNodePosition) {
          const id = addChildNode(parentNode, childNodePosition);
          setTimeout(() => addSelectedNodes([id]), 100);
        }
      }
    },
    [getChildNodePosition, addEdge, store, addChildNode]
  );

  return (
    <>
      {get.isFetching ? (
        <PacmanLoader color={color.mainNode} size={50} className="mx-auto top-1/2" />
      ) : get.isError ? (
        <>
          <PacmanLoader color="red" size={50} className="mx-auto top-1/2" />
        </>
      ) : (
        <ReactFlow
          className={`touchdevice-flow`}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodesDraggable={!view}
          nodesConnectable={!view}
          onEdgesChange={onEdgesChange}
          onClickConnectStart={(e) => console.log('START', e)}
          onClickConnectEnd={(e) => console.log('END', e)}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodeOrigin={nodeOrigin}
          onDrop={onDrop}
          onDragOver={onDragOver}
          connectOnClick={false}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={connectionLineStyle}
          connectionLineType={ConnectionLineType.Straight}
          minZoom={0.01}
          maxZoom={200}
          fitView
        >
          {/* <Controls showInteractive={false} /> */}
          <Background />
          <Panel position="bottom-left" className={`header ${isMobile && 'mobile'}`}>
            <CustomBottomLeft color="sub-node" />
          </Panel>
          {!view && (
            <Panel position="top-left" className={`header ${isMobile && ''}`}>
              <CustomTopLeft color="main-node" />
            </Panel>
          )}
          {/* 
      {!isMobile&&<MiniMap pannable className={color.bg} maskColor="rgb(0, 0, 0, 0.6)" nodeColor={main} />} */}
        </ReactFlow>
      )}
    </>
  );
};
export default FlowView;
