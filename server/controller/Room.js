const express = require("express");
const RoomService = require("../service/Room");
const roomService = new RoomService();
const router = express.Router();

router.get("/:id", (request, response) => {
  roomService.getRoomDetails(request.params.id, (getErr, result) => {
    if (getErr) {
      response.status(500).send(getErr);
    }
    response.send(result);
  });
});

router.get("/list/:userId", (request, response) => {
  roomService.getUserRooms(request.params.userId, (getErr, result) => {
    if (getErr) {
      response.status(500).send(getErr);
    }
    response.send(result);
  });
});

router.post("/", (request, response) => {
  roomService.addRoom(request.body, (addErr, result) => {
    if (addErr) {
      response.status(500).send(addErr);
    }
    response.send(result);
  });
});

module.exports = router;
