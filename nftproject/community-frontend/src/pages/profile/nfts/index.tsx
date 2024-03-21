import "./index.css";
import { HoldingNFTs_1, Communities } from "src/dummy";
import { useEffect, useState } from "react";
import type { NFTCollectionProps } from "src/props";
import { ProfileCarousel } from "src/components/carousel";
import { SlideGenerate } from "src/functions";

const NFTCollection = ({ num, data }: NFTCollectionProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <div className="collection">
      <div className="information" onClick={() => setClicked(!clicked)}>
        <img className="logo" src={Communities[num].community["img"]} />
        <div className="name">{`${Communities[num].community["name"]}(${data.length})`}</div>
      </div>
      <div className={clicked ? "carousel" : "carousel disabled"}>
        <ProfileCarousel data={SlideGenerate<string>(data, 4)} />
      </div>
    </div>
  );
};

export const NFTs = () => {
  return (
    <div className="NFTs main-frame top1">
      {Object.keys(HoldingNFTs_1).map((v) => (
        <NFTCollection num={v} data={HoldingNFTs_1[v]} />
      ))}
    </div>
  );
};
