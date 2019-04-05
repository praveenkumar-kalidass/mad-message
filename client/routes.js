/**
 * UI Routes configuration
 */
import React, {Fragment} from "react";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

// App Components
import App from "./Components/App";
import Room from "./Components/Room";
import Login from "./Components/Login";

export default function routes() {
  return (
    <Router basename="/">
      <Fragment>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route path="/">
            <App>
              <Route exact path="/room/:id" component={Room}></Route>
            </App>
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}
