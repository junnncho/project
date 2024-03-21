import { useFlowStore } from '.';

// export const useColor = (hex = false) => {
//   const color = useFlowStore((state) => state.user.color);
//   if (hex) {
//     const main = getComputedStyle(document.documentElement).getPropertyValue(`--main-color-${color[0]}`);
//     const bg = getComputedStyle(document.documentElement).getPropertyValue(`--main-color-${color[1]}`);
//     const edge = getComputedStyle(document.documentElement).getPropertyValue(`--main-color-${color[2]}`);
//     const txt = getComputedStyle(document.documentElement).getPropertyValue(`--main-color-${color[3]}`);
//     return { main, bg, edge, txt };
//   }
//   return { main: `main-${color[0]}`, bg: `bg-${color[1]}`, edge: `edge-${color[2]}`, txt: `txt-${color[3]}` };
// switch(type){
//     case 'main':
//         return `main-${color[0]}`;
//     case 'bg':
//         return `bg-${color[1]}`;
//     case 'txt':
//         return `txt-${color[2]}`;
// }
// };

export const useColor = () => {
  const main = getComputedStyle(document.documentElement).getPropertyValue(`--main-node-bg`);
  const content = getComputedStyle(document.documentElement).getPropertyValue(`--content-bg`);
  const edge = getComputedStyle(document.documentElement).getPropertyValue(`--edge`);
  const flow = getComputedStyle(document.documentElement).getPropertyValue(`--flow-bg`);
  return { main, content, edge, flow };
};
