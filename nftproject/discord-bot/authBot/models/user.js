"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.NFT, {
        as: "nfts",
        foreignKey: "user_id",
        // onUpdate: defaults to CASCADE
        onDelete: "cascade",
      });
    }
  }
  User.init(
    {
      discord_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      wallet_address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
