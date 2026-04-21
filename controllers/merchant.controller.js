const {
  Merchant,
  User,
  Category,
  Province,
  City,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

/**
 * Generate merchant code:
 * CLN + city_code(2) + province_code(2) + increment(4)
 */
async function generateMerchantCode(cityCode, provinceCode, transaction) {
  cityCode = cityCode.toString().padStart(2, "0");
  provinceCode = provinceCode.toUpperCase();

  const prefix = `CLN${cityCode}${provinceCode}`;

  const lastMerchant = await Merchant.findOne({
    where: {
      code: { [Op.like]: `${prefix}%` },
    },
    order: [["code", "DESC"]],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  let next = 1;
  if (lastMerchant) {
    next = parseInt(lastMerchant.code.slice(-4)) + 1;
  }

  return `${prefix}${next.toString().padStart(4, "0")}`;
}

module.exports = {
  // ======================================================
  // CREATE MERCHANT
  // ======================================================
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const {
        category_id,
        name,
        legality,
        province_id,
        city_id,
        address,
        zipcode,
        revenue_range,
        business_class,
        age,
        ownership_type,
        image_url,
        instagram_url,
        facebook_url,
        tiktok_url,
        tokopedia,
        shopee_url,
        status,
      } = req.body;

      console.log(req.user);

      // ambil city & province untuk kode
      const city = await City.findByPk(city_id, { transaction: t });
      const province = await Province.findByPk(province_id, { transaction: t });

      if (!city || !province) {
        await t.rollback();
        return res.status(400).json({
          message: "City or Province not found",
        });
      }

      const code = await generateMerchantCode(city.code, province.code, t);

      const merchant = await Merchant.create(
        {
          user_id: +req.user.id,
          category_id: +category_id,
          name,
          code,
          legality,
          province_id: +province_id,
          city_id: +city_id,
          address,
          zipcode,
          revenue_range,
          business_class,
          age,
          ownership_type,
          image_url,
          instagram_url,
          facebook_url,
          tiktok_url,
          tokopedia,
          shopee_url,
          status,
        },
        { transaction: t },
      );

      await t.commit();

      res.status(201).json({
        message: "Merchant created",
        data: merchant,
      });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ message: err.message });
    }
  },

  // ======================================================
  // GET ALL MERCHANT (pagination + filter)
  // ======================================================
  async findAll(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        category_id,
        province_id,
        city_id,
        status,
        keyword,
      } = req.query;

      const where = {};

      if (category_id) where.category_id = category_id;
      if (province_id) where.province_id = province_id;
      if (city_id) where.city_id = city_id;
      if (status) where.status = status;

      if (keyword) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { code: { [Op.iLike]: `%${keyword}%` } },
        ];
      }

      const offset = (page - 1) * limit;

      const result = await Merchant.findAndCountAll({
        where,
        limit: Number(limit),
        offset,
        order: [["id", "DESC"]],
        include: [
          { model: User, as: "user" },
          { model: Category, as: "category" },
          { model: Province, as: "province" },
          { model: City, as: "city" },
        ],
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

  // ======================================================
  // GET MERCHANT BY ID
  // ======================================================
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const merchant = await Merchant.findByPk(id, {
        include: [
          { model: User, as: "user" },
          { model: Category, as: "category" },
          { model: Province, as: "province" },
          { model: City, as: "city" },
        ],
      });

      if (!merchant) {
        return res.status(404).json({
          message: "Merchant not found",
        });
      }

      res.json(merchant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // ======================================================
  // UPDATE MERCHANT
  // ======================================================
  async update(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const merchant = await Merchant.findByPk(id);
      if (!merchant) {
        return res.status(404).json({
          message: "Merchant not found",
        });
      }

      await merchant.update(payload);

      res.json({
        message: "Merchant updated",
        data: merchant,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // ======================================================
  // DELETE MERCHANT
  // ======================================================
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const merchant = await Merchant.findByPk(id);
      if (!merchant) {
        return res.status(404).json({
          message: "Merchant not found",
        });
      }

      await merchant.destroy();

      res.json({
        message: "Merchant deleted",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
