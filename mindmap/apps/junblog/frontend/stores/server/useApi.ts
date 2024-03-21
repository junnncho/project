import { Edge, Node } from 'reactflow';
import { FlowUser, NodeData, useFlowStore, useMeStore } from '@junblog/frontend/stores/client';
// import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { BinaryFileData } from '@excalidraw/excalidraw/types/types';
import { Block } from '@blocknote/core';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { env } from '@junblog/frontend/env/env';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',');
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

export const api = axios.create({
  baseURL: env.endpoint,
  withCredentials: true,
});

const whoAmI = async (init?: boolean) => {
  const res = await api.get(`/user/whoami?${init && 'activate=true'}`).then((res) => res.data);
  return res;
};

export const useWhoAmI = () => {
  const change = useMeStore((state) => state.setUser);
  const nickname = useMeStore((state) => state.nickname);
  const changeFlowUser = useFlowStore((state) => state.changeUser);
  const res = useQuery(['whoami'], () => whoAmI(), {
    onSuccess: (data) => {
      change(data);
      changeFlowUser(data);
    },
    onError: async (error: AxiosError) => {
      try {
        const res = await whoAmI(true);
        change(res);
        changeFlowUser(res);
      } catch (e) {
        console.log('error', e);
      }
    },
    enabled: !nickname,
  });
  return res;
};

const logOut = async () => {
  const res = await api.post(`/user/logout`, {}).then((res) => res.data);
  return res;
};

export const useLogOut = () => {
  const clearUser = useMeStore((state) => state.clear);
  const clearFlows = useFlowStore((state) => state.clearFlows);
  const mutation = useMutation(() => logOut(), {
    onSettled: () => {
      clearUser();
      clearFlows();
    },
  });
  return mutation;
};

export const useInitialize = () => {
  const res = useQuery(['whoami'], () => whoAmI(true));
  useMeStore((state) => state.setUser)(res.data);
  return res;
};

export const loadFlow = async () => {
  return await api.get(`/api/load`).then((res) => res.data);
};

export const loadPublicFlow = async (id: string) => {
  const res = await api.get(`/api/load/${id}`).then((res) => res.data);
  return res;
};

export const useLoadFlow = (id?: string) => {
  const change = useFlowStore((state) => state.setFlows);
  const nickname = useMeStore((state) => state.nickname);
  const res = useQuery(
    ['loadFlows', id || 'me'],
    () => {
      if (id) return loadPublicFlow(id);
      return loadFlow();
    },
    {
      onSuccess: (data) => {
        change(data.nodes, data.edges, data.user);
      },
      enabled: !!nickname || !!id,
    }
  );
  return res;
};

export interface UpdateFlowDto {
  nodes: Node<NodeData>[];
  edges: Edge[];
  color: FlowUser['color'];
}

export const updateFlows = async (body: UpdateFlowDto) => {
  const res = await api.post(`/api/update`, body).then((res) => res.data);
  return res;
};

export const useUpdateFlow = () => {
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const color = useFlowStore((state) => state.user.color);
  const mutation = useMutation(
    ['updateFlow'],
    (body?: UpdateFlowDto) => {
      if (!body) return updateFlows({ nodes, edges, color });
      else return updateFlows(body);
    },
    {
      onSuccess: (data) => {
        console.log('update', new Date());
      },
    }
  );
  return mutation;
};

export const getText = async (node: string) => {
  const res = await api.get(`/text/${node}`).then((res) => res.data);
  return res;
};

export const getPublicText = async (node: string, id: string) => {
  const res = await api.get(`/text/public/${node}?id=${id}`).then((res) => res.data);
  return res;
};

export const useGetText = (id?: string) => {
  const node = useFlowStore((state) => state.currentNode);
  const nickname = useMeStore((state) => state.nickname);
  const res = useQuery(
    ['getText', node, id || 'me'],
    () => (node ? (id ? getPublicText(node?.id, id) : getText(node?.id)) : Promise.reject()),
    {
      enabled: !!node && (!!nickname || !!id),
      retry: false,
      cacheTime: 0,
    }
  );
  return res;
};

export interface UpdateTextDto {
  node?: string;
  blocks: Block[];
  time?: number;
  current?: Node<NodeData>;
  hide?: boolean;
  parentNode?: string;
}

export const updateText = async (body: UpdateTextDto) => {
  const res = await api.post(`/text/update`, body).then((res) => res.data);
  return res;
};

export const useUpdateText = () => {
  const mutation = useMutation(
    ['updateText'],
    (body: UpdateTextDto) => {
      if (body.current) {
        const parent = body.current.parentNode;
        const hide = !!body.current.data.private;
        return updateText({
          node: body.current.id,
          blocks: body.blocks,
          time: body.time || Date.now(),
          parentNode: parent,
          hide,
        });
      } else return Promise.reject();
    },
    {
      onSuccess: (data) => {
        console.log('update', new Date());
      },
    }
  );
  return mutation;
};

export const getDraw = async (node: string) => {
  const res = await api.get(`/draw/${node}`).then((res) => res.data);
  return res;
};

export const getPublicDraw = async (node: string, id: string) => {
  const res = await api.get(`/draw/public/${node}?id=${id}`).then((res) => res.data);
  return res;
};

export const useGetDraw = (id?: string) => {
  const node = useFlowStore((state) => state.currentNode);
  const nickname = useMeStore((state) => state.nickname);
  console.log('CHANGE', node?.id);
  const res = useQuery(
    ['getDraw', node?.id, id || 'me'],
    () => (node ? (id ? getPublicDraw(node?.id, id) : getDraw(node?.id)) : Promise.reject()),
    {
      enabled: !!node && (!!nickname || !!id),
      retry: false,
      cacheTime: 0,
    }
  );
  return res;
};

export interface UpdateDrawDto {
  node?: string;
  elements: readonly ExcalidrawElement[];
  current?: Node<NodeData>;
  hide?: boolean;
  parentNode?: string;
}

export const updateDraw = async (body: UpdateDrawDto) => {
  const res = await api.post(`/draw/update`, body).then((res) => res.data);
  return res;
};

export const useUpdateDraw = () => {
  const mutation = useMutation(
    ['updateDraw'],
    (body: UpdateDrawDto) => {
      if (body.current) {
        const parent = body.current.parentNode;
        const hide = !!body.current.data.private;
        return updateDraw({
          node: body.current.id,
          elements: body.elements,
          parentNode: parent,
          hide,
        });
      } else return Promise.reject();
    },
    {
      onSuccess: (data) => {
        console.log('update', new Date());
      },
    }
  );
  return mutation;
};

export const addFile = async (node: string, file: BinaryFileData) => {
  const image = DataURIToBlob(file.dataURL);
  const formData = new FormData();
  formData.append('image', image);
  formData.append('mimeType', file.mimeType);
  formData.append('id', file.id);
  formData.append('node', node);
  formData.append('created', String(file.created));
  file.lastRetrieved && formData.append('lastRetrieved', String(file.lastRetrieved));
  const res = await api.post(`/draw/file`, formData).then((res) => res.data);
  return res;
};

export const uploadFile = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const res = await api.post(`/file/uploadFile`, formData).then((res) => res.data);
  return res;
};

export const useAddFile = () => {
  const node = useFlowStore((state) => state.currentNode);
  const mutation = useMutation(
    ['addFile'],
    (file: BinaryFileData) => (node ? addFile(node.id, file) : Promise.reject()),
    {
      onSuccess: (data) => {
        console.log('update', new Date());
      },
    }
  );
  return mutation;
};
