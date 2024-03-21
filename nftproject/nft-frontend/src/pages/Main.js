import React, { useCallback } from "react";
import About from "../Sections/About";
import Landing from "../Sections/Landing";
import Footer from "../Sections/Footer";
import Team from "../Sections/Team";
import RoadMap from "../Sections/RoadMap";
import Movearound from "../Sections/Movearound";
import Counters from "../Components/Counters";
import RoadMap2 from "../Sections2/RoadMap";
import About2 from "../Sections2/About";
import Landing2 from "../Sections2/Landing";
import BackGround from "../Sections/BackGround";
import { useSpring, animated as a, interpolate } from "react-spring";
import Svg from "../Components/Svg";

export function Main() {
  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const interpBg = xy.interpolate(
    (x, y) =>
      `perspective(400px) rotateY(${x / 60}deg) rotateX(${
        -y / 60
      }deg) translate3d(-50%, -50%, 0)`
  );
  const interpEye = interpolate(
    [st, xy],
    (o, xy) => `translate(${xy[0] / 30},${xy[1] / 30 + 10 + o / 2}) scale(1)`
  );
  const interpPupil = interpolate(
    [st, xy],
    (o, xy) => `translate(${xy[0] / 25},${xy[1] / 25 + -10 + o / 8})`
  );
  const onMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    []
  );
  const onScroll = useCallback((e) => set({ st: e.target.scrollTop / 30 }), []);
  return (
    <div class="svg-container" onMouseMove={onMove} onScroll={onScroll}>
      <Svg
        interpEye={interpEye}
        interpPupil={interpPupil}
        interpBg={interpBg}
      />
      <Landing />
      <Movearound />
      <Counters />
      <About />
      <Team />
      <Footer />
      <BackGround />
    </div>
  );
}
export function Main2() {
  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const interpBg = xy.interpolate(
    (x, y) =>
      `perspective(400px) rotateY(${x / 60}deg) rotateX(${
        -y / 60
      }deg) translate3d(-50%, -50%, 0)`
  );
  const interpEye = interpolate(
    [st, xy],
    (o, xy) => `translate(${xy[0] / 30},${xy[1] / 30 + 10 + o / 2}) scale(1)`
  );
  const interpPupil = interpolate(
    [st, xy],
    (o, xy) => `translate(${xy[0] / 25},${xy[1] / 25 + -10 + o / 8})`
  );
  const onMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    []
  );
  const onScroll = useCallback((e) => set({ st: e.target.scrollTop / 30 }), []);
  return (
    <div class="svg-container" onMouseMove={onMove} onScroll={onScroll}>
      <Svg
        interpEye={interpEye}
        interpPupil={interpPupil}
        interpBg={interpBg}
      />
      <Landing2 />
      <Movearound />
      <Counters />
      <About2 />
      <Team />
      <Footer />

      <BackGround />
    </div>
  );
}
