import React, {Component} from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import _ from "lodash";
import Cookies from "universal-cookie";
import {getUserList} from "../../Actions/User";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  users: state.user.users
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => { dispatch(getUserList()) }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
      userId: ""
    };
  }

  componentDidMount() {
    this.props.getUserList();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      loading: props.loading,
      users: props.users
    };
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.userId) {
      const cookies = new Cookies();
      cookies.set("mad", {
        userId: this.state.userId
      });
      this.props.history.push("/");
    }
  }

  render() {
    const {
      loading,
      users,
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
              {
                loading ?
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid> :
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <Grid item ms={12} sm={12} md={12}>
                    <Typography className="login-header" variant="h4">
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
                        required
                        value={userId}
                        onChange={this.handleChange("userId")}
                        input={
                          <OutlinedInput
                            labelWidth={150}
                            id="user-id" />
                        }>
                        {
                          _.map(users, (user) => (
                            <MenuItem
                              key={user.id}
                              value={user.id}>
                              {`${user.firstName} ${user.lastName}`}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Button variant="contained" color="primary"
                          type="submit">
                          Go
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              }
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
