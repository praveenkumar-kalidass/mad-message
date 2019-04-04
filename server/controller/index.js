const express = require("express");
const userController = require("./User");
const router = express.Router();

router.use("/user", userController);

module.exports = router;
