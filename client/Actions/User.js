import Api from "../Api/User";
import User from "../ActionTypes/User";

const getUserList = () => (dispatch) => {
  dispatch(startLoading());
  Api.getAllUsers().then((response) => {
    dispatch(loadUsers(response.data));
  });
};

const loadUsers = (data) => ({
  type: User.LOAD_USERS,
  data
});

const startLoading = () => ({
  type: User.START_USER_LOADING
});

export {
  getUserList
};
