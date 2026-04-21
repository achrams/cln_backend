"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    static associate(models) {
      // Merchant dimiliki oleh User
      Merchant.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Merchant punya kategori
      Merchant.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      // optional kalau nanti ada tabel Province & City
      Merchant.belongsTo(models.Province, {
        foreignKey: "province_id",
        as: "province",
      });

      Merchant.belongsTo(models.City, {
        foreignKey: "city_id",
        as: "city",
      });
    }
  }

  Merchant.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      legality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      revenue_range: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      business_class: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ownership_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebook_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiktok_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tokopedia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shopee_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Merchant",
      tableName: "Merchants",
    },
  );

  return Merchant;
};
