const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const merchantController = require("../controllers/merchant.controller.js");
router.post("/", auth, merchantController.create);
router.get("/", auth, merchantController.findAll);
router.get("/:id", auth, merchantController.findOne);

// hanya admin & super
router.delete("/:id", auth, role(["A", "S"]), merchantController.destroy);

module.exports = router;
