import React, {Component} from "react";
import {
  Avatar,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import {
  Mail
} from "@material-ui/icons";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import _ from "lodash";
import {getRooms} from "../../Actions/User";

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user,
  groups: state.user.groups,
  chats: state.user.chats
});

const mapDispatchToProps = (dispatch) => ({
  getRooms: (userId) => { dispatch(getRooms(userId)) }
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      groups: [],
      chats: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.props.getRooms(cookies.get("mad").userId);
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading,
      groups: props.groups,
      chats: _.map(props.chats, (chat) => {
        const name = chat.name
          .replace(`${props.user.firstName} ${props.user.lastName}`, "")
          .replace("|", "");
        return {
          ...chat,
          name
        };
      })
    };
  }

  render() {
    const {
      loading,
      groups,
      chats
    } = this.state;

    return (
      <div className="ui-menu">
        <List component="nav"
          subheader={
            <ListSubheader component="div">Groups</ListSubheader>
          }
          disablePadding>
          {
            loading ?
            <ListItem>
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            </ListItem> :
            _.map(groups, (group) => (
              <ListItem key={group.id}>
                <ListItemAvatar>
                  <Avatar>{group.name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={group.name} />
                {
                  !!group.messageCount &&
                  <Chip label={group.messageCount} color="primary"></Chip>
                }
              </ListItem>
            ))
          }
        </List>
        <List component="nav"
          subheader={
            <ListSubheader component="div">Chats</ListSubheader>
          }
          disablePadding>
          {
            loading ?
            <ListItem>
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            </ListItem> :
            _.map(chats, (chat) => (
              <ListItem key={chat.id}>
                <ListItemAvatar>
                  <Avatar>{chat.name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={chat.name} />
                {
                  !!chat.messageCount &&
                  <Chip label={chat.messageCount} color="primary"></Chip>
                }
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
