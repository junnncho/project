import Part from "../Components/Part";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Cloud from "../Components/Cloud2";

const state = [
  {
    srcs: ["./logo.png"],
    style: {
      width: "100%",
      objectFit: "cover",
      alignItems: "center",
      justifyContent: "center",
    },
    head: "GOO GOO PROJECT",
    name: "state1",
  },
  {
    srcs: ["./assets/coingoogoo.png", "./assets/coin.png"],
    style: {
      width: "30%",
      height: "30%",
      objectFit: "cover",
      marginLeft: "50px",
      alignSelf: "center",
    },
    head: "GOO GOO NFT",
    name: "state2",
  },
  {
    srcs: [],
    style: {
      width: "100%",
      objectFit: "cover",
      alignItems: "center",
      justifyContent: "center",
    },
    head: "Platform Configuration",
    name: "state3",
  },
];

function About() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div className="about">
      <Part {...state[0]}>
        A dove has appeared to bring peace to the cringe-worthy NFT market!
        <br />
        <br />
        GOGOO is a project that connects NFT and the community
        <br />
        <br />
        When holders are active in the community, rewards are paid in proportion
        to the amount of activity.
        <br />
        <br />
        GOOGOO is a Web 3.0-based web community that is easily accessible to
        people with little knowledge of NFT.
        <br />
        <br />
      </Part>
      <Part {...state[1]}>
        Mint all collections free of charge so that those interested in NFT
        don't feel burdened by the price.
        <br />
        <br />
        After the minting is over and the price is formed, a fee will be charged
        to the GOOGOO wallet.
        <br />
        <br />
        We will invest fees and operating expenses in blockchain-based content
        and community operations.
      </Part>
      <Part {...state[2]}>
        GOO GOO is a community platform based on WEB3.0.
        <br />
        <br />
        Through marketing collaboration with multiple NFT projects, communities,
        and influencers, the platform can be found in a variety of ways They're
        kind of childish
        <br />
        <br />
        Various events will be held for existing NFT holders to enjoy benefits
        and fun We will provide it.
        <br />
        <br />
        We are planning to launch various P2E games in the form of mini-games
        within the web platform.
        <br />
        <br />
        In the frozen NFT market, communities are brought together as a platform
        to exchange information It's easier to do
        <br />
        <br />
        Newbies who are just starting to get interested in NFT don't leave the
        NFT market, they're going to get information It's easy to get.
        <br />
        <br />
        So that holders can form a DAO within the platform and run the community
        together I'm going to make it.
        <br />
        <br />
        Community users can share NFT or community revenue I have it.
        <br />
        <br />
        The meeting place where NFT holders gather is "GOOGOO".
        <Cloud />
      </Part>
    </div>
  );
}

export default About;
