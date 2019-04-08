const async = require("async");
const RoomDao = require("../dao/Room");
const MessageService = require("../service/Message");
const MemberService = require("../service/Member");
const UserService = require("../service/User");
const roomDao = new RoomDao();
const messageService = new MessageService();
const memberService = new MemberService();
const userService = new UserService();

class RoomService {
  static loadRoomDetails(rooms, userId, loadDetailsCB) {
    async.map(rooms, (room, asyncCB) => {
      async.parallel({
        roomDetail: roomDao.findRoom.bind(null, room.roomId),
        unreadMessages: messageService.getUnreadMessages.bind(null, room.roomId, userId)
      }, (parallelErr, result) => {
        if (parallelErr) {
          return asyncCB(parallelErr);
        }
        return asyncCB(null, {
          ...result.roomDetail.dataValues,
          unreadMessages: result.unreadMessages
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
      (rooms, passIdCB) => (
        passIdCB(null, rooms, userId)
      ),
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

  static loadMembers(roomId, loadCB) {
    async.waterfall([
      async.apply(memberService.getRoomUsers, roomId, null),
      (members, loadDetailsCB) => {
        async.map(members, (member, asyncCB) => {
          userService.getUser(member.userId, (userErr, user) => {
            if (userErr) {
              return asyncCB(userErr);
            }
            return asyncCB(null, user);
          });
        }, (mapErr, result) => {
          if (mapErr) {
            return loadDetailsCB(mapErr);
          }
          return loadDetailsCB(null, result);
        });
      }
    ], (waterfallErr, result) => {
      if (waterfallErr) {
        return loadCB(waterfallErr);
      }
      return loadCB(null, result);
    });
  }

  getRoomDetails(id, getDetailsCB) {
    async.parallel({
      roomDetail: roomDao.findRoom.bind(null, id),
      messages: messageService.getMessagesForRoom.bind(null, id),
      members: RoomService.loadMembers.bind(null, id)
    }, (parallelErr, result) => {
      if (parallelErr) {
        return getDetailsCB(parallelErr);
      }
      return getDetailsCB(null, {
        ...result.roomDetail.dataValues,
        messages: result.messages,
        members: result.members
      });
    });
  }
}

module.exports = RoomService;
