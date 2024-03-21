import React, { useState } from "react";
import Social from "../Components/Social";
import { Link } from "react-router-dom";

function ErrorPage() {
  const [head, setHead] = useState("GOOGOO NFT");
  window.addEventListener("resize", () => {
    var txt = "GOOGOO";
    if (window.innerWidth > 400) {
      txt = "GOOGOO NFT";
    }
    setHead(txt);
  });
  window.addEventListener("load", () => {
    var txt = "GOOGOO";
    if (window.innerWidth > 400) {
      txt = "GOOGOO NFT";
    }
    setHead(txt);
  });

  return (
    <div id="home">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="landing-data">
        <Social position="top" />
        <div className="col-12">
          <span className="iia">You seem to have lost</span>
          <span className="head">{head}</span>
          <span className="vit">ERROR</span>
          <span className="down">
            <Link to="/">
              <button className="redirectbtn">Back to Home</button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
