import { useFlowStore, useModalStore } from '@junblog/frontend/stores/client';
import { Ani, Loading } from '../common';
import { useReactFlow } from 'reactflow';
import { useCallback, useEffect } from 'react';
import { motion as m } from 'framer-motion';

export const DeleteModal = () => {
  const node = useFlowStore((state) => state.currentNode);
  const setModal = useModalStore((state) => state.setModal);
  const { deleteElements } = useReactFlow();
  const deleteNode = useCallback(
    (check = true) => {
      if (node?.id && check) deleteElements({ nodes: [{ id: node.id }] });

      setModal();
    },
    [node, deleteElements, setModal]
  );

  useEffect(() => {
    if (!node) {
      setModal();
    }
  }, [node]);
  return (
    <m.div
      className="bg-black h-full delete-modal"
      initial={{ translateY: '100%' }}
      animate={{ translateY: 0 }}
      exit={{ translateY: 700 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 150, bounce: 0.1, mass: 0.5 }}
    >
      <div className="flex pt-4">
        <Ani.ButtonY duration={0.2} className="w-1/2 choice-button m-4 delete" onClick={() => deleteNode()}>
          Delete
        </Ani.ButtonY>
        <Ani.ButtonY duration={0.2} className="w-1/2 choice-button m-4" onClick={() => deleteNode(false)}>
          Cancel
        </Ani.ButtonY>
      </div>
      <Loading.Packman color={'#ff3f3f'} text="Do you want to delete?" />
    </m.div>
  );
};
