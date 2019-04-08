const MemberDao = require("../dao/Member");
const memberDao = new MemberDao();

class MemberService {
  getUserRooms(userId, getCB) {
    memberDao.findUserRooms(userId, (findErr, rooms) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, rooms);
    });
  }

  getRoomUsers(roomId, userId, getUsersCB) {
    memberDao.findAllRoomUsers(roomId, userId, (findErr, users) => {
      if (findErr) {
        return getUsersCB(findErr);
      }
      return getUsersCB(null, users);
    });
  }

  addMember(data, addCB) {
    memberDao.createMember(data, (createErr, result) => {
      if (createErr) {
        return addCB(createErr);
      }
      return addCB(null, result);
    });
  }
}

module.exports = MemberService;
