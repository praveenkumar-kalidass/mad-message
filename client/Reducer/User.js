import User from "../ActionTypes/User";

const initialState = {
  loading: false,
  users: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case User.START_USER_LOADING:
    return {
      ...state,
      loading: true
    };
  case User.LOAD_USERS:
    return {
      ...state,
      loading: false,
      users: action.data
    };
  default:
    return state;
  }
};
