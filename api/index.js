const express = require("express");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🔥 HANDLE PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ROOT
app.get("/", (req, res) => {
  return res.json({
    status: "OK",
    message: "API running 🚀",
  });
});

// ✅ routes (HAPUS /api DI SINI)
app.use("/auth", require("../routes/auth.routes"));
app.use("/merchants", require("../routes/merchant.routes"));
app.use("/provinces", require("../routes/province.routes"));
app.use("/cities", require("../routes/city.routes"));
app.use("/users", require("../routes/user.routes"));
app.use("/sertifikasi", require("../routes/sertifikasi.routes"));
app.use("/events", require("../routes/event.routes"));
app.use("/notifications", require("../routes/notification.routes"));
app.use("/magazines", require("../routes/magazine.routes"));
app.use("/categories", require("../routes/category.routes"));
app.use("/event-categories", require("../routes/event_category.routes"));

// 🔥 handler Vercel
export default function handler(req, res) {
  return app(req, res);
}
