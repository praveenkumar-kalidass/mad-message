const express = require("express");
const userController = require("./User");
const roomController = require("./Room");
const router = express.Router();

router.use("/user", userController);
router.use("/room", roomController);

module.exports = router;
