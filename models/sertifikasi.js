"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sertifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sertifikasi.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Sertifikasi.init(
    {
      user_id: DataTypes.INTEGER,
      pirt_url: DataTypes.STRING,
      bpom_url: DataTypes.STRING,
      halal_url: DataTypes.STRING,
      nib_url: DataTypes.STRING,
      pirt_status: DataTypes.STRING,
      bpom_status: DataTypes.STRING,
      halal_status: DataTypes.STRING,
      nib_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sertifikasi",
    },
  );
  return Sertifikasi;
};
