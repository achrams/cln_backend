const express = require("express");
const router = express.Router();
const controller = require("../controllers/province.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/:id/cities", controller.getCitiesByProvince);

module.exports = router;
