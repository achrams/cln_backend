const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const magazineController = require("../controllers/magazine.controller.js");
router.get("/", auth, magazineController.getAll);
// hanya admin & super
// router.delete("/:id", auth, role(["A", "S"]), eventController.destroy);

module.exports = router;
