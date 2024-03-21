import React, { useEffect, useState } from "react";
import "./Mint/Minting.css";
import Nav from "../Components/NavResult";
import axios from "axios";
import Caver from "caver-js";
import { FiRefreshCcw } from "react-icons/fi";
const SERVER_URL = "https://hobbies.team";

function Verify() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [connected, setConnected] = useState(true);
  const [discordID, setID] = useState(0);
  const [name, setName] = useState("");
  const [imgList, setImg] = useState([]);
  useEffect(() => {
    console.log("START");
    getDiscordID();
  }, []);

  const getDiscordID = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code === null) {
      alert("Click refresh icon to connect with Discord");
      return;
    }
    console.log("code", code);
    const url = `${SERVER_URL}/redirect?code=${code}`;
    const token = await axios.get(url);
    console.log(token);
    const userResult = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token.data}`,
      },
    });
    console.log("userData", userResult);
    setID(userResult.data.id);
    setName(userResult.data.username);
  };

  async function onDiscordConnect() {
    console.log("onDiscordConnect");

    // 지갑서명
    const caver = new Caver(window.klaytn);
    console.log("create caver");

    const sig = await caver.klay.sign(1, account, "");
    console.log("sig", sig);

    const v = `0x` + sig.substring(2).substring(128, 130);
    const r = `0x` + sig.substring(2).substring(0, 64);
    const s = `0x` + sig.substring(2).substring(64, 128);
    const signature = [v, r, s];
    console.log("signature", signature);

    const url = `${SERVER_URL}/api_discord_connect`;
    const res = await axios.post(url, {
      account,
      discordID,
      signature,
    });
    console.log("resData", res.data.code);
    if (res?.data?.code == 200) {
      alert("Certification passed");
    } else if (res?.data?.code < 0) {
      alert("Certification failed");
    }
  }

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
    const url = `${SERVER_URL}/api_wallet`;
    const res = await axios.post(url, {
      addr: accounts[0],
    });
    console.log("resData", res);
    setBalance(res.data.count);
    setImg(res.data.img_list);
    setConnected(false);
  }

  return (
    <div className="mint-main">
      <Nav />
      <div className="mint">
        <div className="board">
          <img id="board-img" src="/assets/board.png" />
          <span className="chapter">
            <div>DISCORD NFT VERIFY</div>
            <a href="https://discord.com/api/oauth2/authorize?client_id=1013899126020247705&redirect_uri=https%3A%2F%2Fgoogoo.world%2Fnft&response_type=code&scope=identify">
              <FiRefreshCcw />
            </a>
          </span>
          <div className="flex">
            <div className="col-left">
              <h2>Verify in Discord</h2>

              <button
                className="btn1"
                disabled={!connected}
                onClick={async () => {
                  await connect();
                }}
              >
                Connect Wallet
              </button>
              <br />
              <button
                className="btn1"
                disabled={connected}
                onClick={async () => {
                  await onDiscordConnect();
                }}
              >
                Verify
              </button>
              <p id="myWallet">My Wallet</p>
              <p id="myAddress">{account}</p>
              <p id="myKlay">Number of GooGoo: {balance}</p>
              <p>Discord ID: {name}</p>
            </div>
            <div className="col-right">
              <h2>My Collection</h2>
              <div className="second">
                {imgList.map((item, key) => (
                  <img
                    src={item}
                    style={{
                      width: "5vw",
                      height: "5vw",
                      border: "double 0.3vw white",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Verify;
