const UserDao = require("../dao/User");
const userDao = new UserDao();

class UserService {
  getAllUsers(getCB) {
    userDao.findAllUsers((findErr, users) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, users);
    });
  }
}

module.exports = UserService;
