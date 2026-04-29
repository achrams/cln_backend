"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event_category.hasMany(models.Event, {
        foreignKey: "category_id",
        as: "events",
      });
    }
  }
  Event_category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event_category",
    },
  );
  return Event_category;
};
