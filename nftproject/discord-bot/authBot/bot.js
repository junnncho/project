const { Client, Intents } = require("discord.js");
require("dotenv").config();
const {
  CLIENT_ID,
  CLIENT_SECRET,
  CONTRACT_ADDR,
  port,
  MY_URL,
  DISCORD_URL,
} = require("./config");
const Caver = require("caver-js");
const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const caver = new Caver(rpcURL);
const { token } = require("./config");
// const Verify = require("./bot-verify");
const models = require("./models");
// const caver = new Caver(rpcURL);
// let contract = null;
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.once("ready", async () => {
  console.log(`Ready!`);
  contract = await caver.kct.kip17.create(CONTRACT_ADDR);
  loop_db();
});

client.login(token);
console.log("login");

function role_check(level) {
  const three = "1016097200842997770";
  const six = "1016097290974396436";
  const nine = "1016097331336200275";
  if (level >= 9) return nine;
  else if (level >= 6) return six;
  else if (level >= 3) return three;
  else return false;
}

function holder_check(level) {
  const one = "1013958635707183254";
  if (level >= 1) return one;
  else return false;
}

async function add_nft_role(user_id, num) {
  try {
    console.log("verify_nft_role", user_id);
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = await guild.members.fetch(user_id);
    const temp_role = role_check(num);
    const is_holder = holder_check(num);
    if (is_holder) {
      const role1 = guild.roles.cache.get(is_holder);
      console.log("verify HOLDER role add", user_id);
      member.roles.add(role1);
    }
    if (temp_role) {
      const role2 = guild.roles.cache.get(temp_role);
      console.log("verify Number role add", user_id);
      member.roles.add(role2);
    }
  } catch (err) {
    console.log("bot err", err);
  }
}
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function loop_db() {
  while (true) {
    console.log("loop");
    await models.User.findAll({
      include: [
        {
          model: models.NFT,
          as: "nfts",
        },
      ],
    })
      .then(async (user) => {
        if (user) {
          for (const item of user) {
            try {
              if (!item.discord_id) continue;
              process.stdout.write(`${item.discord_id}==`);
              let account = item.wallet_address;
              const temp_num = await contract.balanceOf(account);
              let number = Number(temp_num);
              const one = "1013958635707183254";
              const three = "1016097200842997770";
              const six = "1016097290974396436";
              const nine = "1016097331336200275";
              const guild = client.guilds.cache.get(process.env.GUILD_ID);
              const role3 = guild.roles.cache.get(three);
              const role6 = guild.roles.cache.get(six);
              const role9 = guild.roles.cache.get(nine);
              const member = await guild.members.fetch(item.discord_id);

              let check1 = role_check(number);
              let check2 = role_check(item.number);
              let check3 = holder_check(number);

              if (number >= 1 && !member.roles.cache.has(one)) {
                process.stdout.write(`${"add"}==`);
                const role1 = guild.roles.cache.get(one);
                await member.roles.add(role1);
              } else if (number < 1 && message.member.roles.cache.has(one)) {
                process.stdout.write(`${"remove"}==`);
                const role1 = guild.roles.cache.get(check3);
                await member.roles.remove(role1);
              }

              // }
              if (number >= 9) {
                process.stdout.write(`${"nine"}==`);
                if (member.roles.cache.has(three))
                  await member.roles.remove(role3);
                if (member.roles.cache.has(six))
                  await member.roles.remove(role6);
                if (!member.roles.cache.has(nine))
                  await member.roles.add(role9);
              } else if (number >= 6) {
                process.stdout.write(`${"six"}==`);
                if (member.roles.cache.has(three))
                  await member.roles.remove(role3);
                if (!member.roles.cache.has(six)) await member.roles.add(role6);
                if (member.roles.cache.has(nine))
                  await member.roles.remove(role9);
              } else if (number >= 3) {
                process.stdout.write(`${"three"}==`);
                if (!member.roles.cache.has(three))
                  await member.roles.add(role3);
                if (member.roles.cache.has(six))
                  await member.roles.remove(role6);
                if (member.roles.cache.has(nine))
                  await member.roles.remove(role9);
              }

              if (number != item.number) {
                models.User.findOne({
                  where: { wallet_address: account },
                }).then((user2) => {
                  if (user2) {
                    user2
                      .update({ number: number })
                      .then((r) => console.log("NFT NUMBER IS UPDATED!"));
                  }
                });
              }
              await timer(1200);
            } catch (err) {
              console.log("in loop err", err?.message);
            }
          }
        }
      })
      .catch((error) => console.log("out loop err", error?.message));
  }
}

module.exports = {
  add_nft_role,
};
