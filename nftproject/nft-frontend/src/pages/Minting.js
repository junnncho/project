import React, { useEffect, useState } from "react";
import "./Mint/Minting.css";
import Nav from "../Components/NavResult";
import { ABI, CONTRACTADDRESS, wl_list, og_list } from "./Mint/config.js";
import BigNumber from "bignumber.js";
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

function Minting() {
  const [value, setValue] = useState(3);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [mode, setMode] = useState({
    total: 0,
    name: "",
    mode: 0,
    start: 1,
  });
  const [result, setResult] = useState({
    og: 0,
    wl: 0,
    total: 0,
    publicStart: 0,
    ogStart: 0,
    wlStart: 0,
    price: 0,
    mode: 0,
    index: 0,
  });

  const [block, setBlock] = useState(0);
  useEffect(() => {
    check_status();
    console.log(result);
    setInterval(function () {
      setBlock((block) => block + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (result.mode == 1) {
      setMode({
        total: result.og,
        name: "OG SALE",
        mode: 1,
        num: 2,
        start: result.index,
      });
    } else if (result.mode == 2) {
      setMode({
        total: result.wl,
        name: "WL SALE",
        mode: 2,
        num: 3,
        start: result.index,
      });
    } else if (result.mode == 3) {
      setMode({
        total: 1701 - result.index,
        name: "Public",
        mode: 3,
        num: 1,
        start: result.index,
      });
    }
    setValue(mode.num);
  }, [result]);

  async function connect() {
    const accounts = await window.klaytn.enable();
    console.log(accounts[0]);
    setAccount(String(accounts[0]));
    if (window.klaytn.networkVersion === 8217) {
      console.log("메인넷");
    } else if (window.klaytn.networkVersion === 1001) {
      console.log("테스트넷");
    } else {
      alert("ERROR: Not Connected to Network!");
      return;
    }
    let balance = await window.caver.klay.getBalance(accounts[0]);
    balance = await window.caver.utils.convertFromPeb(balance, "KLAY");
    setBalance(balance);
    await check_status();
  }
  async function check_status() {
    const accounts = await window.klaytn.enable();
    if (!accounts) {
      alert("Activate KaiKas Extension!");
    }
    const myContract = new window.caver.klay.Contract(ABI, CONTRACTADDRESS);
    await myContract.methods
      .mintingInformation()
      .call()
      .then(function (result) {
        console.log(result);
        setResult({
          og: parseInt(result[0]),
          wl: parseInt(result[1]),
          total: parseInt(result[2]),
          publicStart: parseInt(result[3]),
          ogStart: parseInt(result[4]),
          wlStart: parseInt(result[5]),
          price: parseInt(result[6]),
          mode: parseInt(result[7]),
          index: parseInt(result[8]),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setBlock(await window.caver.klay.getBlockNumber());
  }
  async function publicMint() {
    if (window.klaytn.networkVersion === 8217) {
      console.log("메인넷");
    } else if (window.klaytn.networkVersion === 1001) {
      console.log("테스트넷");
    } else {
      alert("ERROR: Not Connected to Network!");
      return;
    }
    if (!account) {
      alert("ERROR: Please Connect Your Wallet!");
      return;
    }

    const myContract = new window.caver.klay.Contract(ABI, CONTRACTADDRESS);
    await check_status();
    if (result.index >= 1700) {
      alert("The End!");
      return;
    } else if (block < result.publicStart) {
      alert("Not Start Yet");
      return;
    }
    const total_value = BigNumber(value * result.price);

    try {
      console.log("민팅");
      const gasAmount = await myContract.methods.publicMint(value).estimateGas({
        from: account,
        gas: 6000000,
        value: total_value,
      });
      console.log("민팅");
      const response = await myContract.methods.publicMint(value).send({
        from: account,
        gas: gasAmount,
        value: total_value,
      });
      console.log(response);
      if (response != null) {
        console.log(response);
        alert("Minting Completed");
      }
    } catch (error) {
      console.log(error);
      alert("Minting Failed");
    }
  }

  async function whitelistMint() {
    if (window.klaytn.networkVersion === 8217) {
      console.log("메인넷");
    } else if (window.klaytn.networkVersion === 1001) {
      console.log("테스트넷");
    } else {
      alert("ERROR: Not Connected to Network!");
      return;
    }
    if (!account) {
      alert("ERROR: Please Connect Your Wallet");
      return;
    }

    const leafNodes = wl_list.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });
    const root = merkleTree.getRoot().toString("hex");
    console.log(root);
    const addr = keccak256(account);
    const hexProof = merkleTree.getHexProof(addr);
    console.log(hexProof);
    const myContract = new window.caver.klay.Contract(ABI, CONTRACTADDRESS);
    await check_status();
    if (result.og + result.wl <= result.index) {
      alert("ERROR: The End!");
      return;
    } else if (block <= result.wlStart) {
      alert("Not Start Yet");
      return;
    }
    const total_value = BigNumber(value * result.price);

    try {
      const gasAmount = await myContract.methods
        .MerkleMint(value, hexProof)
        .estimateGas({
          from: account,
          gas: 6000000,
          value: total_value,
        });
      const response = await myContract.methods
        .MerkleMint(value, hexProof)
        .send({
          from: account,
          gas: gasAmount,
          value: total_value,
        });
      if (response != null) {
        console.log(response);
        alert("Minting Completed");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Minting Failed");
    }
  }

  return (
    <div className="mint-main">
      <Nav />
      <div className="mint">
        <div className="board">
          <img id="board-img" src="/assets/board.png" />
          <div className="chapter">
            Chapter {result.mode}: {mode.name}
          </div>
          <div className="flex">
            <div className="col-left">
              <h2>MINTING INFO</h2>
              <p id="blockNubmer">Current Block: #{block}</p>

              <p id="mintStartBlockNumber">
                Public Starting Block: #{result.publicStart}
              </p>
              <p id="mintPrice">PRICE: {result.price} KLAY</p>
              <br />
              <button
                className="btn1"
                onClick={async () => {
                  await connect();
                }}
              >
                Connect Wallet
              </button>
            </div>
            <div className="col-right">
              <div className="first">
                <p id="myWallet">My Wallet</p>
                <p id="myAddress">{account}</p>
                <p id="myKlay">Balance: {Number(balance).toFixed(2)}</p>
              </div>
              <div className="second">
                <h2>MINT</h2>
                <p id="mintCnt">{result.index - 1537} / 164</p>
                <label for="amount">Amount &nbsp; </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={1}
                  onChange={(e) => setValue(e.target.value)}
                />
                <br />

                <button className="btn2" onClick={publicMint}>
                  Mint
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Minting;
