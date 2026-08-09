const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const contactRoutes = require("./contactRoutes");
const healthRoutes = require("./healthRoutes");
const locationRoutes = require("./locationRoutes");
const deviceRoutes = require("./deviceRoutes");
const emergencyRoutes = require("./emergencyRoutes");

const router = express.Router();

router.get("/healthcheck", (req, res) => res.json({ success: true, data: { status: "ok" } }));
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);
router.use("/health", healthRoutes);
router.use("/location", locationRoutes);
router.use("/devices", deviceRoutes);
router.use("/emergency", emergencyRoutes);

module.exports = router;
