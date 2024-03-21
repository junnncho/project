import { useState } from "react";
import { DaoConsole } from "src/components/postcomponents";
import { dummyDao } from "src/dummy";

export const AccountBook = () => {
  return (
    <div className="top1">
      <CommunityWalletStatus></CommunityWalletStatus>
      <UnitAccountBook></UnitAccountBook>
      <UnitAccountBook></UnitAccountBook>
      <UnitAccountBook></UnitAccountBook>
      <UnitAccountBook></UnitAccountBook>
    </div>
  );
};
export const CommunityWalletStatus = () => {
  return (
    <div className="AccountBookFrame main-frame top1 z1">
      <div className="daoDetailContainer">
        <div className="daoInformationCategory top0">Assets</div>
        <div className="daoInformation">
          DAO wallet address : 0x3b718Ef8ca9582be1Df8665c1DBeB93b88842Ffa
        </div>
        <div className="daoInformation"> total assets : 2545$ </div>
        <div className="daoInformation">total minting funds : 100,000,000$</div>
        <div className="daoInformation"> total withdrawal : 55,356$</div>
        <div className="daoInformation"> total incomes : 2,536$</div>
        <div className="daoInformation"> current assets : 99,947,180$</div>
      </div>
    </div>
  );
};
export const UnitAccountBook = () => {
  const [showDao, setShowDao] = useState<Boolean>(false);
  return (
    <div className="AccountBookFrame main-frame top1 z1">
      <div className="daoStatus" style={{ display: "flex" }}>
        <div className="daoDiv" style={{ backgroundColor: "blue" }}></div>
        Approved
      </div>
      <div className="walletFromTo top1">
        <div className="from">0x723A0B6Da0cb01E03D195A036c926D...</div>
        <i
          className="bx bx-right-arrow-alt"
          style={{ marginTop: "0.4em", marginLeft: "1em" }}
        ></i>
        <div className="to">0xA5a930e03Cd0379962c5babbD88eCF...</div>
      </div>
      <div className="amount">3000USDT</div>
      {showDao && <DaoConsole daoState={dummyDao}></DaoConsole>}
      <button
        className="detailButton"
        onClick={() => {
          setShowDao(!showDao);
        }}
      >
        show dao
      </button>
    </div>
  );
};
