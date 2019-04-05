const models = require("../models");

class UserDao {
  findUserById(id, findCB) {
    models.User.findById(id).then((user) => (
      findCB(null, user)
    ), (findErr) => (
      findCB(findErr)
    ));
  }

  findAllUsers(findCB) {
    models.User.findAll().then((users) => (
      findCB(null, users)
    ), (findErr) => (
      findCB(findErr)
    ));
  }
}

module.exports = UserDao;
