const { Event_category } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const categories = await Event_category.findAll();
      res.json({
        success: true,
        data: categories,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
