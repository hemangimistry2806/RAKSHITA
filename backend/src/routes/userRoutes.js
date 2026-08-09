const express = require("express");
const controller = require("../controllers/userController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { updateUserSchema } = require("../validators/schemas");

const router = express.Router();

router.use(authenticate);
router.get("/me", asyncHandler(controller.getMe));
router.patch("/me", validate(updateUserSchema), asyncHandler(controller.updateMe));

module.exports = router;
