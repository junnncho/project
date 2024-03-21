import React, { useEffect } from "react";
import DarkBg from "../Components/DarkBg";
import AOS from "aos";
import "aos/dist/aos.css";

function Board(props) {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className={props.cls} data-aos="zoom-in" data-aos-offset="-20">
      <div className="bmember">
        <div className="flip-box">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <img src={props.pic} alt={props.name} />
            </div>
            <div className="flip-box-back">
              <a href={props.linkedin}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <h2 className="name">{props.name}</h2>
        <h3 className="desig">{props.designation}</h3>
      </div>
    </div>
  );
}

function Team() {
  return (
    <div id="team">
      <DarkBg head="Team" />
      <div className="team">
        <Board
          name="H A"
          designation="Cofounder / Marketer"
          pic="./assets/Profile/1.png"
          cls="three"
          linkedin="https://twitter.com/googoo_nft"
        />
        <Board
          name="C J"
          designation="Cofounder / Developer"
          pic="./assets/Profile/2.png"
          cls="three"
          linkedin="https://twitter.com/googoo_nft"
        />
        <Board
          name="S"
          designation="Designer"
          pic="./assets/Profile/3.png"
          cls="three"
          linkedin="https://twitter.com/googoo_nft"
        />
      </div>
    </div>
  );
}

export default Team;
