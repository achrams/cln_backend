// require("dotenv").config();
// const express = require("express");
// const serverless = require("serverless-http");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // routes
// app.use("/api/auth", require("../routes/auth.routes"));
// app.use("/api/merchants", require("../routes/merchant.routes"));
// app.use("/api/provinces", require("../routes/province.routes"));
// app.use("/api/cities", require("../routes/city.routes"));
// app.use("/api/users", require("../routes/user.routes"));
// app.use("/api/sertifikasi", require("../routes/sertifikasi.routes"));
// app.use("/api/events", require("../routes/event.routes"));
// app.use("/api/notifications", require("../routes/notification.routes"));
// app.use("/api/magazines", require("../routes/magazine.routes"));
// app.use("/api/categories", require("../routes/category.routes"));
// app.use("/api/event-categories", require("../routes/event_category.routes"));

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "API running 🚀",
//   });
// });

// // ✅ export tunggal
// module.exports = serverless(app);
// const express = require("express");
// const serverless = require("serverless-http");

// const app = express();

// app.get("/", (req, res) => {
//   return res.json({ status: "OK MINIMAL" });
// });

// module.exports = serverless(app);
module.exports = (req, res) => {
  res.status(200).json({ status: "OK DIRECT" });
};
