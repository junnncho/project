import {
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  OnEdgesChange,
  OnNodesChange,
  XYPosition,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import { useApi } from '@junblog/frontend/stores/server';
import { OutputData } from '@editorjs/editorjs';
import { initialValue } from './flowInit';

export type NodeData = {
  label: string;
  size?: number;
  private?: boolean;
};

export interface FlowUser {
  id: string;
  nickname: string;
  image?: string;
  color: {
    mainNode: string;
    edge: string;
    flowBg: string;
    contentBg: string;
  };
}

export interface FlowStore {
  nodes: Node<NodeData>[];
  user: FlowUser;
  currentNode?: Node<NodeData>;
  edges: Edge[];
  setColor: (type: keyof FlowUser['color'], color: string) => void;
  setNode: (node?: Node<NodeData>) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setFlows: (nodes: Node<NodeData>[], edges: Edge[], color: FlowUser) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateNodeSize: (nodeId: string, size: number) => void;
  changeNodesStatus: (status: boolean, nodes: string[], edge?: string[]) => void;
  addChildNode: (parentNode: Node, position: XYPosition) => string;
  addRoot: (position: XYPosition) => Node<NodeData>;
  addEdge: (from: string, to: string) => void;
  // getText: () => Promise<OutputData | null>;
  getChildNodes: (nodeId?: string) => Node<NodeData>[];
  // updateText: (output: OutputData) => Promise<void>;
  // updateFlows: () => Promise<void>;
  changeUser: (user: FlowUser) => void;
  // loadFlows: (id?: string) => Promise<void>;
  clearFlows: () => void;
}

export const useFlowStore = create<FlowStore>((set, get) => ({
  user: { id: '', nickname: '', image: '', color: initialValue.color },
  nodes: initialValue.nodes,
  edges: initialValue.edges,
  getChildNodes: (nodeId?: string) => {
    if (nodeId) {
      return get().nodes.filter((node) => node?.parentNode === nodeId);
    } else {
      return get().nodes.filter((node) => !node?.parentNode);
    }
  },

  setColor: (type, value) => {
    console.log(type, value);
    const user = get().user;
    const color = user.color;
    color[type] = value;
    set({
      user: { ...user, color },
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    const nodes = get().nodes;

    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  setNode: (node) => {
    set({
      currentNode: node,
    });
  },
  changeUser: (user: FlowUser) => {
    set({
      user: {
        id: user?.id || '',
        nickname: user?.nickname || '',
        image: user?.image || '/logo2.png',
        color: user?.color || [2, 4, 1],
      },
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, label };
        }

        return node;
      }),
    });
  },
  updateNodeSize: (nodeId: string, size: number) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, size };
        }

        return node;
      }),
    });
  },
  changeNodesStatus: (status, nodes, edges) => {
    set({
      nodes: get().nodes.map((node) => {
        if (nodes.includes(node.id)) {
          node.data = { ...node.data, private: status };
        }

        return node;
      }),
      edges: get().edges.map((edge) => {
        if (edges?.includes(edge.id)) {
          edge.data = { ...edge.data, private: status };
        }

        return edge;
      }),
    });
  },
  addChildNode: (parentNode: Node, position: XYPosition) => {
    const id = nanoid();
    const size = parentNode.data.size > 6 ? parentNode.data.size * 0.85 : 5;
    const newNode = {
      id,
      type: 'normal',
      data: { label: '', size, private: !!parentNode?.data?.private },
      position,
      dragHandle: '.dragHandle',
      parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
      data: {
        size: parentNode.data.size,
        private: !!parentNode?.data?.private,
      },
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
    return id;
  },
  setFlows: (nodes: Node<NodeData>[], edges: Edge[], user: FlowUser) => {
    set({
      nodes,
      edges,
      user,
    });
  },

  addRoot: (position: XYPosition) => {
    const newNode = {
      id: nanoid(),
      type: 'normal',
      data: { label: '', size: 60 },
      position,
      dragHandle: '.dragHandle',
    };

    set({
      nodes: [...get().nodes, newNode],
    });
    return newNode;
  },
  addEdge: (from: string, to: string) => {
    const nodes = get().nodes.filter((node) => node.id === from);
    const size = nodes.length > 0 ? nodes[0]?.data?.size || 30 : 30;
    const newEdge = {
      id: nanoid(),
      source: from,
      target: to,
      data: { size },
    };
    set({
      edges: [...get().edges, newEdge],
    });
  },

  // getText: async () => {
  //   const node = get().currentNode;
  //   const label = get().currentLabel || 'New Text';
  //   if (!node) return null;
  //   else return await useApi.getText(node, label);
  // },

  // updateText: async (output: OutputData) => {
  //   const node = get().currentNode;
  //   if (!node) return;
  //   await useApi.updateText({
  //     node,
  //     blocks: output.blocks,
  //     time: output.time || Date.now(),
  //   });
  // },

  // updateFlows: async () => {
  //   await useApi.updateFlows({
  //     nodes: get().nodes,
  //     edges: get().edges,
  //     color: get().user.color,
  //   });
  // },

  // loadFlows: async (id?: string) => {
  //   const res = id ? await useApi.loadPublicFlows(id) : await useApi.loadFlows();
  //   if (!res?.user?.color) res.user.color = get().user.color;
  //   set({
  //     nodes: res.nodes || get().nodes,
  //     edges: res.edges || get().edges,
  //     user: res.user || get().user,
  //   });
  // },
  clearFlows: () => {
    set({
      nodes: initialValue.nodes,
      edges: initialValue.edges,
      user: { id: '', nickname: '', image: '', color: initialValue.color },
    });
  },
}));
