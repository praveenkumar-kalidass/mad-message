/**
 * UI Routes configuration
 */
import React, {Fragment} from "react";
import {HashRouter as Router, Route} from "react-router-dom";

// App Components
import App from "./Components/App";
import Login from "./Components/Login";

export default function routes() {
  return (
    <Router basename="/">
      <Fragment>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={App}></Route>
      </Fragment>
    </Router>
  );
}
