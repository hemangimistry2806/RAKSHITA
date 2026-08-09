const express = require("express");
const controller = require("../controllers/locationController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { locationSchema } = require("../validators/schemas");

const router = express.Router();

router.use(authenticate);
router.post("/", validate(locationSchema), asyncHandler(controller.createLocation));
router.get("/latest", asyncHandler(controller.latestLocation));
router.get("/history", asyncHandler(controller.locationHistory));

module.exports = router;
