"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: "users",
        foreignKey: "user_id",
        onDelete: "cascade",
      });
    }
  }

  NFT.init(
    {
      user_id: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "NFT",
    }
  );
  return NFT;
};
