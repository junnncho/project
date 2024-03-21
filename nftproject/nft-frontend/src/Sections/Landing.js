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
            <span className="vit">NFT 통합 커뮤니티</span>
          </div>
        </div>
        <Link to="/eng" className="scrolldown">
          ENGLISH <i className="fa fa-angle-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
