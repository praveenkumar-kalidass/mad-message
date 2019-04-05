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
}

module.exports = MessageService;
