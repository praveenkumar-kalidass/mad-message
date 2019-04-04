import React from "react";
import ReactDOM from "react-dom";
import store from "./Store";
import {Provider} from "react-redux";
import Router from "./routes";

ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById("app")
);
