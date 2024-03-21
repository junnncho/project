import React, { useEffect, useState } from "react";
import * as MINT from "./Mint/mintfunc";
import "./Mint/Minting.css";
import Nav from "../Components/NavResult";

function Minting2() {
  return (
    <div className="mint-main">
      <Nav />
      <div className="mint2">
        <img id="board-img2" src="/assets/soldout3.png" />
      </div>
    </div>
  );
}

export default Minting2;
