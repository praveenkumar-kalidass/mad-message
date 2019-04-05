const models = require("../models");

class MessageDao {
  findAllMessages(roomId, findCB) {
    models.Message.findAll({
      where: {roomId}
    }).then((messages) => (
      findCB(null, messages)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  findUnreadMessages(roomId, findCB) {
    models.Message.findAll({
      where: {
        roomId,
        read: false
      }
    }).then((messages) => (
      findCB(null, messages)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  createMessage(data, createCB) {
    models.Message.create(data).then((message) => (
      createCB(null, message)
    ), (createErr) => (
      createCB(createErr)
    ));
  }
}

module.exports = MessageDao;
