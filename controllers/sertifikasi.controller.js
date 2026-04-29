const { Sertifikasi, User } = require("../models");

module.exports = {
  async getAll(req, res) {
    const { page } = req.query;
    const limit = 10;

    const offset = (page - 1) * limit;

    try {
      const sertifikasi = await Sertifikasi.findAll({
        limit: Number(limit),
        offset,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "first_name", "last_name"],
            include: [
              {
                model: Merchant,
                as: "merchants",
                attributes: [
                  "name",
                  "code",
                  "category_id",
                  "status",
                  "products",
                ],
                required: false,
              },
            ],
          },
        ],
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    const { user_id, bpom_url, pirt_url, halal_url } = req.body;

    try {
      const created = await Sertifikasi.create({
        user_id,
        bpom_url,
        pirt_url,
        halal_url,
        bpom_status: "Uploaded",
        pirt_status: "Uploaded",
        halal_status: "Uploaded",
      });

      res.status(201).json({
        success: "Sertification created",
        data: {
          ...created.toJSON(),
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
