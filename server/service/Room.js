const async = require("async");
const RoomDao = require("../dao/Room");
const MessageService = require("../service/Message");
const MemberService = require("../service/Member");
const roomDao = new RoomDao();
const messageService = new MessageService();
const memberService = new MemberService();

class RoomService {
  static loadRoomDetails(rooms, loadDetailsCB) {
    async.map(rooms, (room, asyncCB) => {
      async.parallel({
        roomDetail: roomDao.findRoom.bind(null, room.roomId),
        messageCount: messageService.getUnreadMessages.bind(null, room.roomId)
      }, (parallelErr, result) => {
        if (parallelErr) {
          return asyncCB(parallelErr);
        }
        return asyncCB(null, {
          ...result.roomDetail.dataValues,
          messageCount: result.messageCount.length
        });
      });
    }, (mapErr, result) => {
      if (mapErr) {
        return loadDetailsCB(mapErr);
      }
      return loadDetailsCB(null, result);
    });
  }

  getUserRooms(userId, getCB) {
    async.waterfall([
      async.apply(memberService.getUserRooms, userId),
      RoomService.loadRoomDetails
    ], (waterfallErr, result) => {
      if (waterfallErr) {
        return getCB(waterfallErr);
      }
      return getCB(null, result);
    });
  }

  static saveMembers(roomId, members, saveCB) {
    async.map(members, (userId, asyncCB) => {
      memberService.addMember({
        roomId,
        userId
      }, (createErr, result) => {
        if (createErr) {
          return asyncCB(createErr);
        }
        return asyncCB(null, result);
      });
    }, (mapErr, result) => {
      if (mapErr) {
        return saveCB(mapErr);
      }
      return saveCB(null, result);
    });
  }

  addRoom(data, addCB) {
    let room;
    async.waterfall([
      async.apply(roomDao.createRoom, data.name, data.type),
      (result, passIdCB) => {
        room = result;
        return passIdCB(null, room.id, data.members);
      },
      RoomService.saveMembers
    ], (waterfallErr) => {
      if (waterfallErr) {
        return addCB(waterfallErr);
      }
      return addCB(null, room);
    });
  }

  getRoomDetails(id, getDetailsCB) {
    async.parallel({
      roomDetail: roomDao.findRoom.bind(null, id),
      messages: messageService.getMessagesForRoom.bind(null, id)
    }, (parallelErr, result) => {
      if (parallelErr) {
        return getDetailsCB(parallelErr);
      }
      return getDetailsCB(null, {
        ...result.roomDetail.dataValues,
        messages: result.messages
      });
    });
  }
}

module.exports = RoomService;
