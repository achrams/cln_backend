const { where } = require("sequelize");
const { User, Notification } = require("../models");

module.exports = {
  async getAll(req, res) {
    const { user_id } = req.params;
    try {
      const notifications = await Notification.findAll({
        where: {
          user_id,
        },
      });

      res.json(notifications);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async createBulk(req, res) {
    const { title, text, routes } = req.body;

    try {
      const users = await User.findAll({
        attributes: ["id"],
      });

      if (!users.length)
        res.status(404).json({
          message: "Users not found.",
        });

      const payload = users.map((user) => ({
        title,
        text,
        routes,
        user_id: user.id,
      }));
      const created = await Notification.bulkCreate(payload);

      res
        .status(201)
        .json({ message: "Notifications created.", data: created });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async createOne(req, res) {
    const { title, text, routes, user_id } = req.body;

    try {
      const user = await User.findByPk(user_id);

      if (!user)
        res.status(404).json({
          message: "User not found.",
        });

      const created = await Notification.create({
        user_id,
        title,
        text,
        routes,
      });

      res.status(201).json({ message: "Notification created.", data: created });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async markAsRead(req, res) {
    const { id } = req.params;

    try {
      const updated = await Notification.update(id, {
        status: "Read",
      });

      res.status(201).json({ message: "Notification Updated.", data: updated });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};
