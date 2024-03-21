import React, { useState } from "react";
import { Link } from "react-scroll";
import { Link as Link2 } from "react-router-dom";

function Nav() {
  const [scrolled, setScroll] = useState("");
  const [nav, setNav] = useState(false);
  const toggle = () => {
    if (nav === true) {
      window.scrollY > 10 ? setScroll("scrolled") : setScroll("");
      setTimeout(setNav(false), 5000);
    } else {
      setScroll("scrolled");
      setNav(true);
    }
  };
  window.addEventListener("scroll", () => {
    let activeClass = "";
    if (window.scrollY > 10) {
      activeClass = "scrolled";
    } else if (nav === true && window.innerWidth < 768) {
      activeClass = "scrolled";
    }
    setScroll(activeClass);
  });
  var durationFn = function (deltaTop) {
    const d = deltaTop < 0 ? -deltaTop / 2 : deltaTop / 2;
    return d < 500 ? 500 : d;
  };
  return (
    <div className={`topnav ${scrolled}`}>
      <img src="./logo.png" alt="HOBBIES" height="45" />
      <Link2 to="/nft" onClick={durationFn}>
        NFT-VERIFY
      </Link2>

      {/* <Link
        to="team"
        spy={true}
        smooth="easeInOutQuad"
        offset={0}
        duration={durationFn}
      >
        Team
      </Link> */}
      <Link
        to="activities"
        spy={true}
        smooth="easeInOutQuad"
        offset={0}
        duration={durationFn}
      >
        Roadmap
      </Link>
      <Link
        to="about"
        spy={true}
        smooth="easeInOutQuad"
        offset={0}
        duration={durationFn}
      >
        Our NFT
      </Link>
      <Link
        to="home"
        spy={true}
        smooth="easeInOutQuad"
        offset={0}
        duration={durationFn}
      >
        home
      </Link>
      <button className="icon" onClick={toggle}>
        <img
          style={{ width: "7%", float: "right" }}
          src="./assets/menu.png "
        ></img>
        {nav ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
      </button>
      {nav ? (
        <div className="sidenav">
          <Link
            to="home"
            spy={true}
            smooth="easeInOutQuad"
            offset={-70}
            duration={durationFn}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth="easeInOutQuad"
            offset={-70}
            duration={durationFn}
          >
            Our NFT
          </Link>
          <Link
            to="activities"
            spy={true}
            smooth="easeInOutQuad"
            offset={-70}
            duration={durationFn}
          >
            Roadmap
          </Link>
          {/* <Link
            to="team"
            spy={true}
            smooth="easeInOutQuad"
            offset={-70}
            duration={durationFn}
          >
            Team
          </Link> */}
          <Link2 to="/nft" onClick={durationFn}>
            NFT-VERIFY
          </Link2>

          {/* <Link to="gallery" spy={true} smooth='easeInOutQuad' offset={-70} duration={durationFn}>Gallery</Link> */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Nav;
