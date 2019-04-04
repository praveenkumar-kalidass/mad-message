import Actions from "../ActionTypes/Friends";

const initialState = {
  friends: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Actions.LOAD_FRIENDS_LIST:
      return {
        ...state,
        friends: action.data
      };
    default:
      return state;
  }
};
