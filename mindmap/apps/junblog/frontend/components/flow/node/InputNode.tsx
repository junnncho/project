import { Handle, Node, NodeProps, Position, useReactFlow } from 'reactflow';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Ani } from '@junblog/frontend/components/common';
import { CustomToolbarBottom, CustomToolbarTop } from '@junblog/frontend/components/flow/panel';
import { isMobile } from 'react-device-detect';
import { useColor, useFlowStore } from '@junblog/frontend/stores/client';

export type NodeData = {
  label: string;
  size: number;
  private?: boolean;
};
const zoomSize = (node?: Node | NodeProps<NodeData>) => {
  if (node) {
    const zoom = node?.data?.size && isMobile ? 3 / node.data.size : node?.data?.size ? 5 / node.data.size : 0.1;
    return { maxZoom: zoom, minZoom: zoom };
  }
  return { maxZoom: 0.1, minZoom: 0.1 };
};

export const InputNode = (props: NodeProps<NodeData>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const updateNodeLabel = useFlowStore((state) => state.updateNodeLabel);
  const { fitView } = useReactFlow();
  // const zoom = getZoom();

  useLayoutEffect(() => {
    if (inputRef.current) {
      // Adjust inputRef size based on input value length
      const inputValue = inputRef.current.value;
      const characterCount = inputValue.length;
      const koreanCharacterCount = (inputValue.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g) || []).length;
      const englishCharacterCount = characterCount - koreanCharacterCount;
      const adjustedSize = koreanCharacterCount * 0.86 + englishCharacterCount * 0.6;
      inputRef.current.style.width = `${adjustedSize}em`;
    }
  }, [props.data.label]);

  useEffect(() => {
    console.log('START', props.selected);

    setTimeout(() => {
      fitView({ nodes: [props], duration: 500, ...zoomSize(props) });
      inputRef.current?.focus({ preventScroll: true });
    }, 300);
  }, [inputRef]);

  useEffect(() => {
    console.log('Check Select', props.selected);
  }, [props.selected]);
  return (
    <CustomToolbarTop props={props} inputRef={inputRef}>
      <Ani.Box className={`main-node custom-node dragHandle`} select={props.selected}>
        <input
          value={props.data.label}
          onChange={(evt) => updateNodeLabel(props.id, evt.target.value)}
          onKeyDown={(evt) => {
            evt.stopPropagation();
          }}
          className={`input-node`}
          ref={inputRef}
          disabled={false}
          style={{
            width: `${spanRef?.current?.getBoundingClientRect().width}`,
          }}
        />
        <span ref={spanRef} className="input-node twin">
          {props.data.label}
        </span>
      </Ani.Box>
      <CustomToolbarBottom props={props} />
    </CustomToolbarTop>
  );
};
