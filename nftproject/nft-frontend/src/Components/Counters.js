import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Counter(props) {
  useEffect(() => {
    AOS.init();
  });
  return props?.src ? (
    <div
      className="counters"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-offset="-20"
    >
      <div className="count">{props.count}</div>
      <a target="_blank" rel="noreferrer" href={props.src}>
        <div className="spec">{props.spec}</div>
      </a>
    </div>
  ) : (
    <div
      className="counters"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-offset="-20"
    >
      <div className="count">{props.count}</div>
      <div className="spec">{props.spec}</div>
    </div>
  );
}

function Counters() {
  return (
    <div className="d-flex2">
      <Counter
        count="1800+"
        spec="TWITTER"
        src="https://twitter.com/googoo_nft"
      />
      <Counter
        count="2000+"
        spec="DISCORD"
        src="https://discord.gg/GvmYjZdQpY"
      />
      <Counter count="FREE" spec="PRICE" />
    </div>
  );
}

export default Counters;
