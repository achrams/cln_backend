const { City, Province } = require("../models");

module.exports = {
  // GET /cities
  async getAll(req, res) {
    try {
      const cities = await City.findAll({
        attributes: ["id", "city", "code"],
        include: [
          {
            model: Province,
            as: "province",
            attributes: ["id", "province"],
          },
        ],
        order: [["city", "ASC"]],
      });

      res.json({
        success: true,
        data: cities,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // GET /cities/by-province/:provinceId
  async getByProvince(req, res) {
    try {
      const cities = await City.findAll({
        where: {
          province_id: req.params.provinceId,
        },
        attributes: ["id", "city", "code"],
        order: [["city", "ASC"]],
      });

      res.json({
        success: true,
        data: cities,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
