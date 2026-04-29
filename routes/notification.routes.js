const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification.controller");

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/:user_id", auth, controller.getAll);
router.post("/create", auth, role(["A", "S"]), controller.createBulk);
router.post("/create/:id", auth, role(["A", "S"]), controller.createOne);
router.put("/update/:id", controller.markAsRead);

module.exports = router;
