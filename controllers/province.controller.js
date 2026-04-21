const { Province, City } = require("../models");

module.exports = {
  // GET /provinces
  async getAll(req, res) {
    try {
      const provinces = await Province.findAll({
        attributes: ["id", "province", "code"],
        order: [["province", "ASC"]],
      });

      res.json({
        success: true,
        data: provinces,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // GET /provinces/:id
  async getById(req, res) {
    try {
      const province = await Province.findByPk(req.params.id);

      if (!province) {
        return res.status(404).json({
          success: false,
          message: "Province not found",
        });
      }

      res.json({
        success: true,
        data: province,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // GET /provinces/:id/cities
  async getCitiesByProvince(req, res) {
    try {
      const province = await Province.findByPk(req.params.id, {
        attributes: ["id", "name", "code"],
        include: [
          {
            model: City,
            as: "cities",
            attributes: ["id", "city", "code"],
            required: false, // 👈 kalau belum ada city → []
          },
        ],
      });

      if (!province) {
        return res.status(404).json({
          success: false,
          message: "Province not found",
        });
      }

      res.json({
        success: true,
        data: province,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
