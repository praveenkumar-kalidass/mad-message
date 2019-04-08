const models = require("../models");
const Op = require("sequelize").Op;

class MemberDao {
  findUserRooms(userId, findCB) {
    models.Member.findAll({
      where: {userId}
    }).then((rooms) => (
      findCB(null, rooms)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  findAllRoomUsers(roomId, userId, findCB) {
    models.Member.findAll({
      where: {
        roomId,
        userId: {
          [Op.ne]: userId
        }
      }
    }).then((users) => (
      findCB(null, users)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  createMember(data, createCB) {
    models.Member.create(data).then((member) => (
      createCB(null, member)
    ), (createErr) => (
      createCB(createErr)
    ));
  }
}

module.exports = MemberDao;
