const express = require("express");
const UserService = require("../service/User");
const userService = new UserService();
const router = express.Router();

router.get("/all", (request, response) => {
  userService.getAllUsers((getErr, result) => {
    if (getErr) {
      response.status(500).send(getErr);
    }
    response.send(result);
  });
});

router.get("/:id", (request, response) => {
  userService.getUser(request.params.id, (getErr, result) => {
    if (getErr) {
      response.status(500).send(getErr);
    }
    response.send(result);
  });
});

module.exports = router;
