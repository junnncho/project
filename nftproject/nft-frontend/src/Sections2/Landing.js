import React, { useState } from "react";
import Nav from "../Components/Nav";
import Social from "../Components/Social";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div id="home">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="landing-data">
        <Nav />
        <Social position="top" />
        <div className="col-12">
          <div className="land">
            {/* <span className="head">GOOGOO</span>
            <br /> */}
            <img src="/logo2.png" />
            <span className="vit">NFT Community</span>
          </div>
        </div>
        <Link to="/" className="scrolldown">
          한국어 <i className="fa fa-angle-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
