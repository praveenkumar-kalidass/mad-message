const MessageDao = require("../dao/Message");
const messageDao = new MessageDao();

class MessageService {
  getMessagesForRoom(roomId, getCB) {
    messageDao.findAllMessages(roomId, (findErr, messages) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, messages);
    });
  }

  getUnreadMessages(roomId, getCB) {
    messageDao.findUnreadMessages(roomId, (findErr, messages) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, messages);
    });
  }

  saveMessage(data, saveCB) {
    messageDao.createMessage(data, (createErr, message) => {
      if (createErr) {
        return saveCB(createErr);
      }
      return saveCB(null, message);
    });
  }
}

module.exports = MessageService;
