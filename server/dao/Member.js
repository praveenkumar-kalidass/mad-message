const models = require("../models");

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

  createMember(data, createCB) {
    models.Member.create(data).then((member) => (
      createCB(null, member)
    ), (createErr) => (
      createCB(createErr)
    ));
  }
}

module.exports = MemberDao;
