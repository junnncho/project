import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Ticker from "react-ticker";
import Cloud from "../Components/Cloud";

const picture = [
  "./assets/Move/1.png",
  "./assets/Move/2.png",
  "./assets/Move/3.png",
  "./assets/Move/4.png",
  "./assets/Move/5.png",
  "./assets/Move/6.png",
  "./assets/Move/7.png",
  "./assets/Move/8.png",
  "./assets/Move/9.png",
];

function Movearound() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="move">
      <h2 className="title" data-aos="fade-up" data-aos-offset="-20">
        GOO GOO NFT
      </h2>
      <Ticker>
        {({ index }) => (
          <div className="ticker-element">
            <img
              src={picture[index % picture.length]}
              style={{
                height: "100%",
                objectFit: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
              }}
            />
          </div>
        )}
      </Ticker>
    </div>
  );
}
export default Movearound;
