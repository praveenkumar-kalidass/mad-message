import Room from "../ActionTypes/Room";
import _ from "lodash";

const initialState = {
  loading: false,
  room: {},
  messages: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Room.START_ROOM_LOADING:
    return {
      ...state,
      loading: true
    };
  case Room.LOAD_ROOM_DETAILS:
    return {
      ...state,
      loading: false,
      messages: action.data.messages,
      room: _.omit(action.data, ["messages"])
    };
  case Room.LOAD_ROOM_MESSAGE:
    return {
      ...state,
      messages: _.union(state.messages, [action.data])
    };
  default:
    return state;
  }
};
