"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event_attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event_attendance.belongsTo(models.Event, {
        foreignKey: "event_id",
        as: "event",
      });

      Event_attendance.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Event_attendance.init(
    {
      event_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      presence: DataTypes.ARRAY(DataTypes.BOOLEAN),
    },
    {
      sequelize,
      modelName: "Event_attendance",
    },
  );
  return Event_attendance;
};
