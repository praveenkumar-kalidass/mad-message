import React, {Component} from "react";
import {
  Button,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@material-ui/core";
import "./style.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    const {
      userId
    } = this.state;

    return (
      <Grid container className="ui-login">
        <Hidden xsDown>
          <Grid item sm={8} md={8} className="login-theme-background">
          </Grid>
          <Grid item xs={12} sm={4} md={4}
            className="login-container">
            <Grid container direction="column" justify="center"
              className="login-form-container">
              <Grid item ms={12} sm={12} md={12}>
                <Typography className="login-header"
                  variant="h4" gutterBottom>
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormControl variant="outlined" fullWidth
                  className="user-input-control">
                  <InputLabel htmlFor="user-id">
                    Login with a user
                  </InputLabel>
                  <Select
                    value={userId}
                    onChange={this.handleChange("userId")}
                    input={
                      <OutlinedInput
                        labelWidth={150}
                        id="user-id" />
                    }>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}
