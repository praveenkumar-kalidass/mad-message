import React, {Component} from "react";
import {
  Grid
} from "@material-ui/core";
import Menu from "../Menu";
import Header from "../Header";
import "./style.scss";

class App extends Component {
  render() {
    return (
      <Grid container className="ui-app">
        <Grid item md={2} sm={2} md={2}>
          <Menu />
        </Grid>
        <Grid item md={10} sm={10} md={10}>
          <Header />
        </Grid>
      </Grid>
    );
  }
}

export default App;
