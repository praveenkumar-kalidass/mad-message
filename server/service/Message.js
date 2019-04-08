const async = require("async");
const MessageDao = require("../dao/Message");
const MemberService = require("../service/Member");
const messageDao = new MessageDao();
const memberService = new MemberService();

class MessageService {
  getMessagesForRoom(roomId, getCB) {
    messageDao.findAllMessages(roomId, (findErr, messages) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, messages);
    });
  }

  getUnreadMessages(roomId, userId, getCB) {
    messageDao.findUnreadMessages(roomId, userId, (findErr, messages) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, messages);
    });
  }

  saveMessage(data, app, saveCB) {
    let message;
    async.waterfall([
      async.apply(messageDao.createMessage, data),
      (result, emitSocketCB) => {
        message = result;
        app.locals.io.to(result.roomId).emit("message", result);
        return emitSocketCB(null, result.roomId, result.userId);
      },
      memberService.getRoomUsers,
      (users, emitNotificationCB) => {
        async.map(users, (user, asyncCB) => {
          app.locals.io.to(user.userId).emit("notification", message);
          return asyncCB(null, user);
        }, (mapErr) => {
          if (mapErr) {
            return emitNotificationCB(mapErr);
          }
          return emitNotificationCB(null);
        });
      }
    ], (waterfallErr) => {
      if (waterfallErr) {
        return saveCB(waterfallErr);
      }
      return saveCB(null, message);
    });
  }

  updateMessages(messages, updateCB) {
    async.map(messages, (message, asyncCB) => {
      messageDao.updateReadMessage(message, (updateErr, result) => {
        if (updateErr) {
          return asyncCB(updateErr);
        }
        return asyncCB(null, result);
      });
    }, (mapErr, result) => {
      if (mapErr) {
        return updateCB(mapErr);
      }
      return updateCB(null, result);
    });
  }
}

module.exports = MessageService;
