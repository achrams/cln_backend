const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const eventController = require("../controllers/event.controller.js");
router.get("/", auth, eventController.getAll);
router.post("/", auth, eventController.create);
router.get("/:id", auth, eventController.getOne);

router.post("/attendance", auth, eventController.createAttendance);
router.get("/attendance", auth, eventController.getAttendance);
router.put("/attendance/:id", auth, eventController.updateAttendance);

// hanya admin & super
// router.delete("/:id", auth, role(["A", "S"]), eventController.destroy);

module.exports = router;
