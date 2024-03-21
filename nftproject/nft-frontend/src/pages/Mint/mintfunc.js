// import { ABI, CONTRACTADDRESS, whitelist } from "./config.js";
// import BigNumber from "bignumber.js";
// const { MerkleTree } = require("merkletreejs");
// const keccak256 = require("keccak256");

// let account;
// let mintIndexForSale = 0;
// let maxSaleAmount = 0;
// let mintPrice = 0;
// let mintStartBlockNumber = 0;
// let mintLimitPerBlock = 0;

// let blockNumber = 0;
// let blockCnt = false;

// export async function connect() {
//   const accounts = await window.klaytn.enable();
//   if (window.klaytn.networkVersion === 8217) {
//     console.log("메인넷");
//   } else if (window.klaytn.networkVersion === 1001) {
//     console.log("테스트넷");
//   } else {
//     alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
//     return;
//   }
//   account = accounts[0];
//   window.caver.klay.getBalance(account).then(function (balance) {
//     document.getElementById("myWallet").innerHTML = `지갑주소: ${account}`;
//     document.getElementById(
//       "myKlay"
//     ).innerHTML = `잔액: ${window.caver.utils.fromPeb(balance, "KLAY")} KLAY`;
//   });
//   await check_status();
// }

// export async function publicMint() {
//   if (window.klaytn.networkVersion === 8217) {
//     console.log("메인넷");
//   } else if (window.klaytn.networkVersion === 1001) {
//     console.log("테스트넷");
//   } else {
//     alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
//     return;
//   }
//   if (!account) {
//     alert("ERROR: 지갑을 연결해주세요!");
//     return;
//   }

//   const myContract = new window.caver.klay.Contract(ABI, CONTRACTADDRESS);
//   const amount = document.getElementById("amount").value;
//   await check_status();
//   if (maxSaleAmount + 1 <= mintIndexForSale) {
//     alert("모든 물량이 소진되었습니다.");
//     return;
//   } else if (blockNumber <= mintStartBlockNumber) {
//     alert("아직 민팅이 시작되지 않았습니다.");
//     return;
//   }
//   const total_value = BigNumber(amount * mintPrice);

//   try {
//     console.log("민팅");
//     const gasAmount = await myContract.methods.publicMint(amount).estimateGas({
//       from: account,
//       gas: 6000000,
//       value: total_value,
//     });
//     console.log("가스", gasAmount);
//     const result = await myContract.methods
//       .publicMint(amount)
//       .send({
//         from: account,
//         gas: gasAmount,
//         value: total_value,
//       })
//       .on("error", console.error);
//     console.log(result);
//     if (result != null) {
//       console.log(result);
//       alert("민팅에 성공하였습니다.");
//       connect();
//     }
//   } catch (error) {
//     console.log(error);
//     alert("민팅에 실패하였습니다.");
//   }
// }

// export async function whitelistMint() {
//   const accounts = await klaytn.enable();
//   if (klaytn.networkVersion === 8217) {
//     console.log("메인넷");
//   } else if (klaytn.networkVersion === 1001) {
//     console.log("테스트넷");
//   } else {
//     alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
//     return;
//   }
//   account = accounts[0];

//   const leafNodes = whitelist.map((addr) => keccak256(addr));
//   const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
//   const root = merkleTree.getRoot().toString("hex");
//   console.log(root);
//   const addr = keccak256(account);
//   const hexProof = merkleTree.getHexProof(addr);
//   const myContract = new caver.klay.Contract(ABI, CONTRACTADDRESS);
//   //const amount = document.getElementById('amount').value;
//   const amount = 2;
//   await check_status();
//   if (maxSaleAmount + 1 <= mintIndexForSale) {
//     alert("모든 물량이 소진되었습니다.");
//     return;
//   } else if (blockNumber <= wlStartBlockNumber) {
//     alert("아직 민팅이 시작되지 않았습니다.");
//     return;
//   }
//   const total_value = BigNumber(amount * mintPrice);

//   try {
//     const gasAmount = await myContract.methods.wlMint(5, hexProof).estimateGas({
//       from: amount,
//       gas: 6000000,
//       value: total_value,
//     });
//     result = await myContract.methods.wlMint(5, hexProof).send({
//       from: amount,
//       gas: gasAmount,
//       value: total_value,
//     });
//     if (result != null) {
//       console.log(result);
//       alert("민팅에 성공하였습니다.");
//     }
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//     alert("민팅에 실패하였습니다.");
//   }
// }
