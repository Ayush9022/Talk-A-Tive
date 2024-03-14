const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controllers/chatsController");
const { fetchChats } = require("../controllers/chatsController");
const { createGroupChat } = require("../controllers/chatsController");
const { renameGroup } = require("../controllers/chatsController");
const { removeFromGroup } = require("../controllers/chatsController");
const { addToGroup } = require("../controllers/chatsController");
const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.put("/groupremove", protect, removeFromGroup);
router.put("/groupadd", protect, addToGroup);

module.exports = router;
