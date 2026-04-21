const { User } = require("../models");
const bcrypt = require("bcryptjs");
const generateQRCodeWithLogo = require("../utils/qr.js"); // <-- import QR
module.exports = {
  // ✅ CREATE USER
  async create(req, res) {
    try {
      const { email, password, phone, first_name, last_name, level, status } =
        req.body;

      if (!email)
        return res.status(400).json({ message: "Email harus diisi." });
      else if (!password)
        return res.status(400).json({ message: "Password harus diisi." });

      const hashedPassword = await bcrypt.hash(password, 10);

      // 1️⃣ create user dulu
      const user = await User.create({
        email,
        password: hashedPassword,
        phone,
        first_name,
        last_name,
        level,
        status,
      });

      // 2️⃣ generate QR (pakai user id biar unique)
      const qrPayload = JSON.stringify({
        userId: user.id,
        email: user.email,
        t: Date.now(),
      });

      const qrResult = await generateQRCodeWithLogo(qrPayload);

      if (qrResult.status !== 200) {
        return res.status(500).json({
          message: "User created but QR failed",
          data: user,
        });
      }

      // 3️⃣ update user dengan qr_url
      await user.update({
        qr_url: qrResult.url,
      });

      res.status(201).json({
        message: "User created",
        data: {
          ...user.toJSON(),
          qr_url: qrResult.url,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // 📄 GET ALL USERS
  async findAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const where = {};

      if (
        req.user.level === "I" ||
        req.user.level === "II" ||
        req.user.level === "III"
      ) {
        where.user_id = req.user.id;
      }

      const result = await Merchant.findAndCountAll({
        where,
        limit: Number(limit),
        offset: (page - 1) * limit,
        include: ["category", "province", "city"],
      });

      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // 🔍 GET USER BY ID
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: ["merchants"],
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✏️ UPDATE USER
  async update(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // kalau update password
      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      }

      await user.update(payload);

      res.json({
        message: "User updated",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ❌ DELETE USER
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      await user.destroy();

      res.json({
        message: "User deleted",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
