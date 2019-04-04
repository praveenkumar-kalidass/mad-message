import React, {Fragment} from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import App from "./Components/App";
import Friends from "./Components/Friends";

export default () => (
  <Router basename="/">
    <Fragment>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/friends" component={Friends}></Route>
    </Fragment>
  </Router>
);
