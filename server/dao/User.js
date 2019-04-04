const models = require("../models");

class UserDao {
  findAllUsers(findCB) {
    models.User.findAll().then((users) => (
      findCB(null, users)
    ), (findErr) => (
      findCB(findErr)
    ));
  }
}

module.exports = UserDao;
