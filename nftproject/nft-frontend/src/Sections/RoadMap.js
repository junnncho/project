import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Events from "../Components/Events";

function RoadMap() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <span id="activities">
      <div className="roadmap">
        <h2 className="title" data-aos="fade-up" data-aos-offset="-20">
          로드맵
        </h2>
        <p className="subhead" data-aos="fade-up" data-aos-offset="-20">
          우리의 목표
        </p>
      </div>
      <Events />
    </span>
  );
}

export default RoadMap;
