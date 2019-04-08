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
  case User.CLEAR_READ_MESSAGES:
    return {
      ...state,
      groups: _.map(state.groups, (room) => {
        if (room.id === action.data) {
          room.unreadMessages = [];
        }
        return room;
      }),
      chats: _.map(state.chats, (room) => {
        if (room.id === action.data) {
          room.unreadMessages = [];
        }
        return room;
      })
    };
  case User.PUSH_NOTIFICATION:
    return {
      ...state,
      groups: _.map(state.groups, (room) => {
        if (room.id === action.data.roomId) {
          room.unreadMessages = _.union(room.unreadMessages, [action.data]);
        }
        return room;
      }),
      chats: _.map(state.chats, (room) => {
        if (room.id === action.data.roomId) {
          room.unreadMessages = _.union(room.unreadMessages, [action.data]);
        }
        return room;
      })
    };
  case User.LOAD_GROUP:
    return {
      ...state,
      groups: _.union(state.groups, [action.data])
    };
  case User.LOAD_CHAT:
    return {
      ...state,
      chats: _.union(state.chats, [action.data])
    };
  default:
    return state;
  }
};
