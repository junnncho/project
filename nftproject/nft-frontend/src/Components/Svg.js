import React from "react";
import { animated as a } from "react-spring";
const Svg = (props) => {
  return (
    <a.svg
      className="svg"
      style={{ transform: props.interpBg }}
      viewBox="0 122 595.28 595.28"
    >
      <g id="1">
        <path
          className="cls-3"
          fill={"#" + Math.floor(Math.random() * 16777215).toString(16)}
          d="M454.59,312.87v242.64c0,20.14-16.4,36.46-36.63,36.46H191.93c-22.65,0-41.01-18.28-41.01-40.82v-243.47c0-58.95,35.74-112.52,90.87-134.09,109.18-42.71,212.8,36.24,212.8,139.28Z"
        />
      </g>
      <a.g id="2" transform={props.interpEye}>
        <ellipse
          class="cls-1"
          fill="#FFF"
          cx="230.4"
          cy="304.86"
          rx="30.95"
          ry="30.8"
        />
        <ellipse
          class="cls-1"
          fill="#FFF"
          cx="377.39"
          cy="304.86"
          rx="30.95"
          ry="30.8"
        />
        <path
          class="cls-4"
          fill="#d8d973"
          d="M345.87,377.76l-37.89,63.33c-2.92,4.9-10.06,4.85-12.91-.08l-36.17-62.35c-2.86-4.93,.66-11.11,6.38-11.18l1.3-.02c3.37-13.01,17.83-22.79,35.17-22.79s31.11,9.31,34.91,21.86l2.69-.04c5.85-.08,9.53,6.26,6.53,11.27Z"
        />
        <a.g transform={props.interpPupil}>
          <ellipse
            class="cls-2"
            fill="#231815"
            cx="221.57"
            cy="308.35"
            rx="13.72"
            ry="13.66"
          />
          <ellipse
            class="cls-2"
            fill="#231815"
            cx="385.88"
            cy="308.35"
            rx="13.72"
            ry="13.66"
          />
        </a.g>
      </a.g>
    </a.svg>
  );
};

export default Svg;
