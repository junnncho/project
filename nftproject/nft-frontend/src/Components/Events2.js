import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Event(props) {
  useEffect(() => {
    AOS.init();
  });
  const img = "eimg " + props.fit;
  return (
    <div
      className={`events ${props.banner ? "event-banner" : ""}`}
      data-aos="zoom-out-up"
      data-aos-offset="-20"
    >
      <div className="eimgdesc">
        <img className={img} src={props.img} alt={props.name} />
        <div className="img-overlay">
          <div className="edesc">{props.desc}</div>
        </div>
      </div>
      <div className="ename">{props.name}</div>
    </div>
  );
}

function Events2() {
  return (
    <div className="d-flex event-container">
      <Event
        img="./assets/Percent/10.png"
        fit="fit"
        name="July,2022"
        desc={
          <p>
            1. Launch Website <br />
            <br />
            2. Open a community channel
            <br />
            (Discord, KakaoTalk, Twitter)
            <br />
            <br />
            3. Airdrop and Whitelist Events
            <br />
            <br />
            4. Partnership agreement and project promotion
          </p>
        }
      />
      <Event
        img="./assets/Percent/20.png"
        fit="fit"
        name="August,2022"
        desc={
          <p>
            In August, Minting will be held
            <br />
            (Variable depending on market conditions)
          </p>
        }
      />
      <Event
        img="./assets/Percent/30.png"
        fit="fit"
        name="October,2022"
        desc={<p>Comming Soon</p>}
      />
      <Event
        img="./assets/Percent/40.png"
        fit="fit"
        name="Nov-Dec,2022"
        desc={<p>Comming Soon</p>}
      />
      <Event
        img="./assets/Percent/50.png"
        fit="fit"
        name="Jan-Feb,2023"
        desc={<p>Comming Soon </p>}
      />
      <Event
        img="./assets/Percent/60.png"
        fit="fit"
        name="March,2023"
        desc="Comming Soon"
      />
      <Event
        img="./assets/Percent/70.png"
        fit="fit"
        name="April,2023"
        desc="Comming Soon"
      />
      <Event
        img="./assets/Percent/80.png"
        fit="fit"
        name="May,2023"
        desc="Comming Soon"
      />
      {/* <Event img="./assets/Logos/udaan.png" fit="fit" name="Udaan" desc="Udaan is a business ecosystem simulation where partakers get to learn about the intricacies behind businesses, which are beyond obvious. Students get to devise business plans which are financially sustainable while being efficient with processes involving legalities, compliance and managing CXOs to facilitate company's scalability." /> */}
      <Event
        img="./assets/Percent/90.png"
        fit="fit"
        name="June,2023"
        desc="Comming Soon"
      />
      {/* <Event img="./assets/Logos/alumni_talk.png" fit="fit" name="Alumni Talk" desc="There's no better teacher than experience and no better preacher than the experienced. Expand the horizons of your knowledge and learn the best ways to deal with obstacles from people who have already been in your shoes in the past." /> */}
    </div>
  );
}

export default Events2;
