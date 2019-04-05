import React, {Component} from "react";
import {
  AppBar,
  Avatar,
  Grid,
  Toolbar,
  Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import {getUserDetail} from "../../Actions/User";

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetail: (id) => { dispatch(getUserDetail(id)) }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.props.getUserDetail(cookies.get("mad").userId);
  }

  static getDerivedStateFromProps(props) {
    return {
      user: props.user
    }
  }

  render() {
    const {
      user
    } = this.props;

    return (
      <AppBar className="app-header" position="sticky" color="secondary">
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item>
            </Grid>
            <Grid item>
              {
                !!user.id &&
                <Grid container alignItems="center" spacing={16}>
                  <Grid item>
                    <Avatar src={`http://localhost:3000${user.image}`} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  </Grid>
                </Grid>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
