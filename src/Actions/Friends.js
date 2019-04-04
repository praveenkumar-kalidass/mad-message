import Api from "../Api/Friends";
import Actions from "../ActionTypes/Friends";

const getAllFriends = () => (dispatch) => {
  Api.getAllFriends().then((response) => {
    dispatch(loadFriendsList(response.data));
  });
};

const loadFriendsList = (friends) => ({
  type: Actions.LOAD_FRIENDS_LIST,
  friends
});

export {
  getAllFriends
};
