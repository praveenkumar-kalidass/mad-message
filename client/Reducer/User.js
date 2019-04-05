import User from "../ActionTypes/User";
import _ from "lodash";

const initialState = {
  loading: false,
  user: {},
  users: [],
  groups: [],
  chats: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case User.START_USER_LOADING:
    return {
      ...state,
      loading: true
    };
  case User.LOAD_USER:
    return {
      ...state,
      user: action.data
    };
  case User.LOAD_USERS:
    return {
      ...state,
      loading: false,
      users: action.data
    };
  case User.LOAD_ROOMS:
    return {
      ...state,
      loading: false,
      groups: _.filter(action.data, {type: "GROUP"}),
      chats: _.filter(action.data, {type: "USER"})
    };
  default:
    return state;
  }
};
