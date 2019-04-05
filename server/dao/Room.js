const models = require("../models");

class RoomDao {
  findRoom(id, findCB) {
    models.Room.findById(id).then((room) => (
      findCB(null, room)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  createRoom(name, type, createCB) {
    models.Room.create({name, type}).then((room) => (
      createCB(null, room)
    ), (createErr) => (
      createCB(createErr)
    ));
  }
}

module.exports = RoomDao;
