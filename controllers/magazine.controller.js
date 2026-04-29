const { Magazine } = require("../models");

module.exports = {
  async getAll(req, res) {
    const { page = page || 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
      const result = await Magazine.findAndCountAll({
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      res.json({
        total: result.count,
        page: Number(page),
        totalPage: Math.ceil(result.count / limit),
        data: result.rows,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
