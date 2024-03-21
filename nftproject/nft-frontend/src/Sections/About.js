import Part from "../Components/Part";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Cloud from "../Components/Cloud";

const state = [
  {
    srcs: ["./logo.png"],
    style: {
      width: "100%",
      objectFit: "cover",
      alignItems: "center",
      justifyContent: "center",
    },
    head: "GOO GOO 프로젝트",
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
    head: "플랫폼 구성",
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
        움츠러든 NFT 시장에 평화를 가져다줄 비둘기가 나타났다!
        <br />
        <br />
        GOOGOO는 NFT와 커뮤니티를 연계시킨 프로젝트로
        <br />
        <br />
        홀더들이 커뮤니티에서 활동을 하면 활동량에 비례하여 리워드를 지급합니다.
        <br />
        <br />
        GOOGOO는 Web3.0기반의 웹 커뮤니티로 NFT에 대해 지식이 부족한 사람들도
        쉽게 접근할 수 있습니다.
        <br />
        <br />
      </Part>
      <Part {...state[1]}>
        NFT에 관심을 가지는 사람들이 가격에 부담을 느끼지 않도록 모든 콜렉션을
        무료로 민팅합니다.
        <br />
        <br />
        민팅이 종료되고 가격이 형성되면 GOOGOO지갑에 수수료가 들어옵니다.
        <br />
        <br />
        수수료 및 운영비를 블록체인 기반 컨텐츠 및 커뮤니티 운영에 투자할
        예정입니다.
      </Part>
      <Part {...state[2]}>
        GOO GOO는 WEB3.0 기반 커뮤니티 플랫폼입니다.
        <br />
        <br />
        여러 NFT 프로젝트, 커뮤니티, 인플루언서들과 마케팅 협업을 통해 플랫폼에
        유치시키기도 하고,
        <br />
        <br />
        기존 NFT 홀더들을 대상으로 다양한 이벤트를 개최해 혜택 및 즐거움을
        제공할 것입니다.
        <br />
        <br />
        <br />
        웹 플랫폼 내에서 미니게임 형식의 다양한 P2E 게임을 론칭할 계획입니다.
        <br />
        <br />
        얼어붙은 NFT시장에서 여러 커뮤니티를 하나의 플랫폼으로 모아 정보교환를
        더욱 쉽게 할 수 있고,
        <br />
        <br />
        NFT에 관심을 막 가지기 시작한 뉴비들이 NFT시장을 떠나지 않고 정보들을
        쉽게 얻을 수 있습니다.
        <br />
        <br />
        <br />
        플랫폼 내에 홀더들이 DAO를 형성하여 함께 커뮤니티를 운영해나갈 수 있도록
        만들 예정입니다.
        <br />
        <br />
        NFT나 커뮤니티로 인한 수익은 커뮤니티 유저들이 함께 나눠 받을 수
        있습니다.
        <br />
        <br />
        그러한 NFT 홀더들이 모이는 만남의 장이 바로 "GOOGOO" 입니다.
        <Cloud />
      </Part>
    </div>
  );
}

export default About;
