const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { URLSearchParams } = require("url");
const { exist_db, discord_db } = require("./dbset");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  CONTRACT_ADDR,
  port,
  MY_URL,
  DISCORD_URL,
} = require("./config");
const Caver = require("caver-js");
const { add_nft_role } = require("./bot");
const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const networkID = "8217";
const caver = new Caver(rpcURL);
let contract = null;

// const WALLET_ADDR = "0x941a7a3a0b9b63d23d245e55cefc593ae0a63290";
async function initContract() {
  contract = await caver.kct.kip17.create(CONTRACT_ADDR);

  console.log("initContract ok");
}
initContract();

console.log("discord ouath2 link", DISCORD_URL);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/", (request, response) => {
  return response.sendFile("index.html", { root: "." });
});

app.get("/redirect", async function (request, response) {
  try {
    var code = request.query.code;
    // Make our POST body
    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", MY_URL);
    var site = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    var res = await site.json();
    console.log("res", res);
    var accessToken = res["access_token"];
    response.send(accessToken);
  } catch (err) {
    console.log("redirect error" + err);
  }
  // Check their GET params to get the code
});

app.post("/api_discord_connect", async (request, response) => {
  try {
    console.log("api_discord_connect", request.body);

    const { account, discordID, signature } = request.body;

    console.log("wallet_addr", account);
    let sign_ret = await caver.validator.validateSignedMessage(
      //
      "",
      signature,
      account
    );
    console.log("sign_ret", sign_ret);

    if (!sign_ret) {
      return response.json({
        code: -1,
        message: `wallet sign fail`,
      });
    }

    ret = await contract.balanceOf(account);
    const count = Number(ret);
    if (count < 1) {
      return response.json({
        code: -1,
        message: `count fail, ${count}`,
      });
    }

    console.log("count", count);
    if (String(discordID).length > 5) {
      await discord_db(account, discordID);
      add_nft_role(discordID, count);
    }
    console.log(discordID);
    return response.json({
      code: 200,
      message: "ok",
    });
  } catch (err) {
    console.log("discord_connect error" + err);
  }
});

app.post("/api_wallet", async (request, response) => {
  try {
    console.log("api_wallet", request.body);

    const addr = request.body.addr;
    let ret;
    ret = await contract.balanceOf(addr);
    const count = Number(ret);
    console.log("count", count);
    const img_list = [];

    for (var i = 0; i < count; i++) {
      if (i > 3) break;
      let num = await contract.tokenOfOwnerByIndex(addr, i);
      img_list.push(
        `https://ipfs.io/ipfs/QmW7YhE9EaLoXAAg1we7UCcHszZH5pj6tNwVNk9TpuyN43/${num}.png`
      );
    }
    if (count > 0) await exist_db(addr, img_list, count);

    console.log(img_list);

    return response.json({
      code: 200,
      message: "ok",
      count,
      img_list,
    });
  } catch (err) {
    console.log("api wallet error" + err);
  }
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
