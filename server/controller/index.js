const express = require("express");
const userController = require("./User");
const roomController = require("./Room");
const messageController = require("./Message");
const router = express.Router();

router.use("/user", userController);
router.use("/room", roomController);
router.use("/message", messageController);

module.exports = router;
