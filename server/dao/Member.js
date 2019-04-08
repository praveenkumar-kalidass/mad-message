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
    let where = {roomId};
    if (userId) {
      where = {
        ...where,
        userId: {
          [Op.ne]: userId
        }
      };
    }
    models.Member.findAll({where}).then((users) => (
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
