import Api from "../Api/User";
import User from "../ActionTypes/User";

const getUserDetail = (id) => (dispatch) => {
  Api.getUserDetail(id).then((response) => {
    dispatch(loadUser(response.data));
  });
};

const loadUser = (data) => ({
  type: User.LOAD_USER,
  data
});

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

const getRooms = (userId) => (dispatch) => {
  dispatch(startLoading());
  Api.getRooms(userId).then((response) => {
    dispatch(loadRooms(response.data));
  });
};

const loadRooms = (data) => ({
  type: User.LOAD_ROOMS,
  data
});

const startLoading = () => ({
  type: User.START_USER_LOADING
});

export {
  getUserDetail,
  getUserList,
  getRooms
};
