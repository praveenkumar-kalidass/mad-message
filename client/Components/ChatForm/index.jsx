import React, {Component} from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  KeyboardArrowRight
} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import _ from "lodash";
import {
  getUserList,
  addRoom
} from "../../Actions/User";

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user,
  users: state.user.users,
  chats: state.user.chats
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => { dispatch(getUserList()) },
  addRoom: (data, callback) => { dispatch(addRoom(data, callback)) }
});

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: true,
      users: [],
      submit: false
    };
  }

  componentDidMount() {
    this.props.getUserList();
  }

  static getDerivedStateFromProps(props) {
    const cookies = new Cookies();
    return {
      open: props.open,
      loading: props.loading,
      users: _.reject(props.users, {id: cookies.get("mad").userId})
    };
  }

  startChat = (member) => () => {
    const chat = _.find(this.props.chats, (room) => (
      new RegExp(room.name).test(`${member.firstName} ${member.lastName}`)
    ));
    if(chat) {
      this.props.handleForm("chatForm", false)();
      this.props.history.push(`/room/${chat.id}`);
    } else {
      this.props.addRoom({
        name: `${this.props.user.firstName} ${this.props.user.lastName}|${member.firstName} ${member.lastName}`,
        type: "USER",
        members: [this.props.user.id, member.id]
      }, (data) => {
        this.props.handleForm("chatForm", false)();
        this.props.history.push(`/room/${data.id}`);
      });
    }
  }

  render() {
    const {
      open,
      loading,
      users
    } = this.state;

    return (
      <Dialog className="ui-chat-form"
        open={open}
        fullWidth
        maxWidth="sm">
        <DialogTitle>Start Chat</DialogTitle>
        <DialogContent>
          <List>
            {
              loading ?
              <ListItem>
                <CircularProgress />
              </ListItem> :
              _.map(users, (user) => (
                <ListItem key={user.id} button onClick={this.startChat(user)}>
                  <Avatar src={`http://localhost:3000${user.image}`} />
                  <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <KeyboardArrowRight />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={this.props.handleForm("chatForm", false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatForm));
