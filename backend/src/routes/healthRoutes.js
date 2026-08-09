const express = require("express");
const controller = require("../controllers/healthController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { healthReadingSchema } = require("../validators/schemas");

const router = express.Router();

router.use(authenticate);
router.post("/readings", validate(healthReadingSchema), asyncHandler(controller.createReading));
router.get("/readings", asyncHandler(controller.listReadings));
router.get("/latest", asyncHandler(controller.latestReading));

module.exports = router;
