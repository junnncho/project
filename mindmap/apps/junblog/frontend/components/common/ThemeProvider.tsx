import { useFlowStore } from '@junblog/frontend/stores/client';
import { CSSProperties } from 'react';

const txtColorFromBg = (bgColor: string, hard?: boolean) => {
  const lightColor = '#ffffff';
  const darkColor = '#000000';
  if (!bgColor) return darkColor;
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > (hard ? 0.01 : 0.179) ? darkColor : lightColor;
};

export const ThemeProvider = ({ children, className }) => {
  const color = useFlowStore((state) => state.user)?.color;
  const style = color
    ? ({
        '--main-node-bg': color.mainNode,
        '--main-node-text': txtColorFromBg(color.mainNode),
        '--edge': color.edge,
        '--edge-text': txtColorFromBg(color.edge),
        '--content-bg': color.contentBg,
        '--content-text': txtColorFromBg(color.contentBg),
        '--flow-bg': color.flowBg,
        '--flow-text': txtColorFromBg(color.flowBg, true),
      } as CSSProperties)
    : {};

  return (
    <div className={`${className} mainflow`} style={style}>
      {children}
    </div>
  );
};
