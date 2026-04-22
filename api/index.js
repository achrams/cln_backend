require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", require("../routes/auth.routes"));
app.use("/api/merchants", require("../routes/merchant.routes"));
app.use("/api/provinces", require("../routes/province.routes"));
app.use("/api/cities", require("../routes/city.routes"));
app.use("/api/users", require("../routes/user.routes"));
app.use("/api/categories", require("../routes/category.routes"));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API running 🚀",
  });
});

// ❗ penting
module.exports = app;
