const models = require("./models");

async function exist_db(addr, list, number) {
  models.User.findOne({ where: { wallet_address: addr } }).then((user) => {
    if (!user) {
      console.log("not exist in db (create)", addr);
      models.User.create(
        {
          wallet_address: addr,
          number: number,
          nfts: list.map((item) => ({ url: item })),
        },
        {
          include: [
            {
              model: models.NFT,
              as: "nfts",
            },
          ],
        }
      ).then((r) => console.log("DB Data is added!"));
    } else {
      console.log("already exist in db (update)", addr);
      user
        .update(
          {
            number: number,
            nfts: list.map((item) => ({ url: item })),
          },
          {
            include: [
              {
                model: models.NFT,
                as: "nfts",
              },
            ],
          }
        )
        .then((r) => console.log("DB Data is updated!"));
    }
  });
}
async function discord_db(addr, id) {
  models.User.findOne({ where: { wallet_address: addr } }).then((user) => {
    if (user) {
      user
        .update({ discord_id: id })
        .then((r) => console.log("discord_id is updated!"));
    }
  });
}
module.exports = {
  exist_db,
  discord_db,
};
