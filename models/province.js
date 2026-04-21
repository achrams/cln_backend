"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      Province.hasMany(models.Merchant, {
        foreignKey: "province_id",
        as: "merchants",
      });
    }
  }

  Province.init(
    {
      province: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Province",
      tableName: "Provinces",
    },
  );

  return Province;
};
