/**
 * UI Routes configuration
 */
import React, {Fragment} from "react";
import {HashRouter as Router, Route} from "react-router-dom";

// App Components
import App from "./Components/App";
import Login from "./Components/Login";
import Friends from "./Components/Friends";

export default () => (
  <Router basename="/">
    <Fragment>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/friends" component={Friends}></Route>
    </Fragment>
  </Router>
);
