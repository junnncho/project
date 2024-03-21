import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Events from "../Components/Events2";

function RoadMap2() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <span id="activities">
      <div className="roadmap">
        <h2 className="title" data-aos="fade-up" data-aos-offset="-20">
          Roadmap
        </h2>
        <p className="subhead" data-aos="fade-up" data-aos-offset="-20">
          What is our goal?
        </p>
      </div>
      <Events />
    </span>
  );
}

export default RoadMap2;
