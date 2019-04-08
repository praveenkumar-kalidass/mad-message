const express = require("express");
const MessageService = require("../service/Message");
const messageService = new MessageService();
const router = express.Router();

router.post("/", (request, response) => {
  messageService.saveMessage(request.body, request.app, (saveErr, result) => {
    if (saveErr) {
      response.status(500).send(saveErr);
    }
    response.send(result);
  });
});

router.post("/read", (request, response) => {
  messageService.updateMessages(request.body, (updateErr, result) => {
    if (updateErr) {
      response.status(500).send(updateErr);
    }
    response.send(result);
  });
});

module.exports = router;
