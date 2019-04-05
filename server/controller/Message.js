const express = require("express");
const MessageService = require("../service/Message");
const messageService = new MessageService();
const router = express.Router();

router.post("/", (request, response) => {
  messageService.saveMessage(request.body, (saveErr, result) => {
    if (saveErr) {
      response.status(500).send(saveErr);
    }
    response.send(result);
  });
});

module.exports = router;
