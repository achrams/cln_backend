const bcrypt = require("bcryptjs");
const { User, Merchant, Category, Sertifikasi } = require("../models");
const generateQRCodeWithLogo = require("../utils/qr.js"); // <-- import QR

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    if (!email) return res.status(400).json({ message: "Email harus diisi." });
    else if (!password)
      return res.status(400).json({ message: "Password harus diisi." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
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

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const str = email.substring(0, 2);

    let isPhone = false;

    if (/^\d{2}$/.test(str)) isPhone = true;
    const where = {};

    if (isPhone) where.phone = email;
    else where.email = email;

    const user = await User.findOne({ where });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    if (!user.qr_url) {
      const qrPayload = JSON.stringify({
        userId: user.id,
        email: user.email,
        t: Date.now(),
      });

      const qrResult = await generateQRCodeWithLogo(qrPayload);

      await user.update({
        qr_url: qrResult.url,
      });

      if (qrResult.status !== 200) {
        console.log("qr failed to generated.");
      }
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "level",
        "qr_url",
        "img_url",
        "status",
      ],
      include: [
        {
          model: Merchant,
          as: "merchants",
          attributes: ["name", "code", "category_id", "status", "products"],
          required: false,
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["name"], // 👈 ambil name category
            },
          ],
        },
        {
          model: Sertifikasi,
          as: "sertifikasi",
          required: false,
        },
      ],
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
