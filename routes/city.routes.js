const express = require("express");
const router = express.Router();
const controller = require("../controllers/city.controller");

router.get("/", controller.getAll);
router.get("/by-province/:provinceId", controller.getByProvince);

module.exports = router;
