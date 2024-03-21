import { dummy, dummyDao } from "src/dummy";

export const DaoDetails = () => {
  return (
    <div className="daoDetailContainer">
      <div className="daoTitle">{dummyDao.title}</div>
      <div className="daodescription">{dummyDao.description}</div>
      <div className="daoInformationCategory">Blocks</div>
      <div className="daoInformation">chain : ETH</div>
      <div className="daoInformation">contract block : {dummyDao.block}</div>
      <div className="daoInformation">start block : 98508</div>
      <div className="daoInformation">current block : 1000123</div>
      <div className="daoInformationCategory">Contracts</div>
      <div className="daoInformation">
        vote contract : {dummyDao.voteContract}
      </div>
      <div className="daoInformation">
        community wallet : {dummyDao.commuWalletAdress}
      </div>
      <div className="daoInformation">
        receiver waller : {dummyDao.receivWalletAddress}
      </div>
      <div className="daoInformation">TxHash : {dummyDao.TxHashDots}</div>
    </div>
  );
};
