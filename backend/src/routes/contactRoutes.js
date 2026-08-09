const express = require("express");
const controller = require("../controllers/contactController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const { contactSchema, updateContactSchema, idParamSchema } = require("../validators/schemas");

const router = express.Router();

router.use(authenticate);
router.get("/", asyncHandler(controller.listContacts));
router.post("/", validate(contactSchema), asyncHandler(controller.createContact));
router.patch("/:id", validate(updateContactSchema), asyncHandler(controller.updateContact));
router.delete("/:id", validate(idParamSchema), asyncHandler(controller.deleteContact));

module.exports = router;
