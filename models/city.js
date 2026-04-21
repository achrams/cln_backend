"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.Merchant, {
        foreignKey: "city_id",
        as: "merchants",
      });
    }
  }

  City.init(
    {
      city: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
      tableName: "Cities",
    },
  );

  return City;
};
