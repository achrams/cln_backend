require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
const authRoutes = require("./routes/auth.routes");
const merchantRoutes = require("./routes/merchant.routes");
const provinceRoutes = require("./routes/province.routes");
const cityRoutes = require("./routes/city.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");

app.use("/api/auth", authRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
// ===== TEST =====
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API running 🚀",
  });
});

// ===== SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
