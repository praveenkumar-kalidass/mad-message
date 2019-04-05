const UserDao = require("../dao/User");
const userDao = new UserDao();

class UserService {
  getUser(id, getCB) {
    userDao.findUserById(id, (findErr, user) => {
      if (findErr) {
        return getCB(findErr);
      }
      return getCB(null, user);
    });
  }
  
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
