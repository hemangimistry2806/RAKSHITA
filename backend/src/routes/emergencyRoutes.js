const express = require("express");
const controller = require("../controllers/emergencyController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { emergencySimulateSchema, idParamSchema } = require("../validators/schemas");

const router = express.Router();

router.use(authenticate);
router.post("/simulate", validate(emergencySimulateSchema), asyncHandler(controller.simulate));
router.get("/", asyncHandler(controller.listEvents));
router.get("/:id", validate(idParamSchema), asyncHandler(controller.getEvent));
router.post("/:id/cancel", validate(idParamSchema), asyncHandler(controller.cancelEvent));
router.post("/:id/resolve", validate(idParamSchema), asyncHandler(controller.resolveEvent));
router.post("/:id/escalate", validate(idParamSchema), asyncHandler(controller.escalateEvent));

module.exports = router;
