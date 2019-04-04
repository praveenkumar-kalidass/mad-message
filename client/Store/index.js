import {createStore, applyMiddleware} from "redux";
import rootReducer from "../Reducer";
import thunk from "redux-thunk";

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
