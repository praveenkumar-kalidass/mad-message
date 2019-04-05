import {combineReducers} from "redux";
import room from "./Room";
import user from "./User";

export default combineReducers({
  room,
  user
});
