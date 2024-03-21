import { MutableRefObject } from "react";

export const scrollEndDetector = (
  detector: boolean,
  setDetector: (state: boolean) => void,
  beforeHeight: MutableRefObject<number>
) => {
  window.addEventListener("scroll", () => {
    let height = document.documentElement.scrollHeight;
    let position =
      document.documentElement.scrollTop +
      document.documentElement.clientHeight * 2;
    if (height < position && !(beforeHeight.current === height)) {
      // 랜더링이 되면 beforeheight랑 height 가 다를거임.
      setDetector(true);
      beforeHeight.current = height;
      console.log("before, now , detected", beforeHeight, height, detector);
    } else {
      console.log("undetected");
    }
  });
};
