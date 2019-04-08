const models = require("../models");
const Op = require("sequelize").Op;

class MessageDao {
  findAllMessages(roomId, findCB) {
    models.Message.findAll({
      where: {roomId},
      order: ["createdAt"]
    }).then((messages) => (
      findCB(null, messages)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  findUnreadMessages(roomId, userId, findCB) {
    models.Message.findAll({
      where: {
        roomId,
        read: false,
        userId: {
          [Op.ne]: userId
        }
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

  updateReadMessage(data, updateCB) {
    models.Message.update({
      read: true
    }, {
      where: {
        id: data.id
      }
    }).then((message) => (
      updateCB(null, message)
    ), (updateErr) => (
      updateCB(updateErr)
    ));
  }
}

module.exports = MessageDao;
