import DarkBg from "../Components/DarkBg";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Part({ srcs, style, head, name, children }) {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className={`split ${name}`}>
      <div className="col-left">
        <div className="text-container">
          <h2 className="title" data-aos="fade-up" data-aos-offset="-20">
            {head}
          </h2>
          <p className="content" data-aos="zoom-in" data-aos-offset="-20">
            {children}
          </p>
        </div>
      </div>
      <div className="col-right">
        <div className="split-img">
          {srcs.map((src) => (
            <img
              src={src}
              style={style}
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Part;
