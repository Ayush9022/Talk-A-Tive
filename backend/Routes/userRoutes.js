// import express from "express";
// import { registerUser } from "../controllers/userControlers.js";

const express = require("express");
const { registerUser } = require("../controllers/userControlers.js");
const { authUser } = require("../controllers/userControlers.js");
const { allUsers } = require("../controllers/userControlers.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/", protect, allUsers);

module.exports = router;
