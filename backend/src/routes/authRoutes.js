const express = require("express");
const controller = require("../controllers/authController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { registerSchema, loginSchema } = require("../validators/schemas");

const router = express.Router();

router.post("/register", validate(registerSchema), asyncHandler(controller.register));
router.post("/login", validate(loginSchema), asyncHandler(controller.login));
router.get("/me", authenticate, asyncHandler(controller.me));

module.exports = router;
