import React from "react";
import Social from "../Components/Social";

function Footer() {
  return (
    <div className="footer">
      <img src="./logo.png" alt="GOOGOO" className="logo" />
      <span className="iia">WEB3.0 NFT PlatForm</span>
      <a href="googoo.nft@gmail.com">googoo.nft@gmail.com</a>
      <Social position="bottom" />
    </div>
  );
}

export default Footer;
