"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Merchant, {
        foreignKey: "user_id",
        as: "merchants",
      });

      User.hasMany(models.Event_attendance, {
        foreignKey: "user_id",
        as: "event_attendances",
      });

      User.hasOne(models.Sertifikasi, {
        foreignKey: "user_id",
        as: "sertifikasi",
      });

      User.hasMany(models.Notification, {
        foreignKey: "user_id",
        as: "notifications",
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qr_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "III",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};
