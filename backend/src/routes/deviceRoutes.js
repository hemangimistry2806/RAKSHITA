const express = require("express");
const controller = require("../controllers/deviceController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { deviceSchema, updateDeviceSchema } = require("../validators/schemas");

const router = express.Router();

router.use(authenticate);
router.post("/", validate(deviceSchema), asyncHandler(controller.createDevice));
router.get("/", asyncHandler(controller.listDevices));
router.patch("/:id", validate(updateDeviceSchema), asyncHandler(controller.updateDevice));

module.exports = router;
