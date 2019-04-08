import React, {Component} from "react";
import ReactDOM from "react-dom";
import {
  Avatar,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";
import {
  Send,
  Settings
} from "@material-ui/icons";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import _ from "lodash";
import {
  getRoomDetails,
  startRoom,
  stopRoom,
  sendMessage
} from "../../Actions/Room";
import {
  readMessages
} from "../../Actions/User";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.room.loading,
  room: state.room.room,
  messages: state.room.messages,
  members: state.room.members,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  getRoomDetails: (id, callback) => { dispatch(getRoomDetails(id, callback)) },
  startRoom: (id, callback) => { dispatch(startRoom(id, callback)) },
  stopRoom: (id) => { dispatch(stopRoom(id)) },
  sendMessage: (data) => { dispatch(sendMessage(data)) },
  readMessages: (roomId, data) => { dispatch(readMessages(roomId, data)) }
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId: "",
      room: {},
      messages: [],
      message: "",
      members: {}
    };
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    const cookies = new Cookies();
    this.setState({
      userId: cookies.get("mad").userId
    });
    this.props.getRoomDetails(this.props.match.params.id, () => {
      this.el.scrollTop = this.el.scrollHeight;
    });
    this.props.startRoom(this.props.match.params.id, () => {
      this.el.scrollTop = this.el.scrollHeight;
    });
  }

  componentWillUnmount() {
    this.props.stopRoom(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props) {
    if (props.room.type === "USER") {
      props.room.name = props.room.name
        .replace(`${props.user.firstName} ${props.user.lastName}`, "")
        .replace("|", "");
    }
    return {
      loading: props.loading,
      room: props.room,
      messages: props.messages,
      members: _.groupBy(props.members, "id")
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.stopRoom(prevProps.match.params.id);
      this.props.getRoomDetails(this.props.match.params.id, () => {
        this.el.scrollTop = this.el.scrollHeight;
      });
      this.props.startRoom(this.props.match.params.id, () => {
        this.el.scrollTop = this.el.scrollHeight;
      });
    }
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendMessage({
      userId: this.state.userId,
      roomId: this.props.match.params.id,
      text: this.state.message
    });
    this.setState({
      message: ""
    });
  }

  updateMessages = () => {
    const unread = _.filter(this.state.messages, (message) => {
      return (message.userId !== this.state.userId) && !message.read;
    });
    if (unread.length) {
      this.props.readMessages(
        this.props.match.params.id,
        unread
      );
    }
  }

  render() {
    const {
      loading,
      userId,
      room,
      messages,
      message,
      members
    } = this.state;

    return (
      <div className="gis-room">
        {
          !loading &&
          <Grid container justify="space-between" alignItems="center"
            className="room-details-container">
            <Grid item>
              <Typography variant="h5">{room.name}</Typography>
            </Grid>
            <Grid item>
              <IconButton disabled><Settings /></IconButton>
            </Grid>
          </Grid>
        }
        <div className="messages-container">
          {
            loading &&
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          }
          {
            _.map(messages, (message) => (
              <Grid container
                direction={message.userId === userId ? "row-reverse" : "row"}
                key={message.id}
                spacing={16}
                alignItems="center">
                <Grid item>
                  <Avatar
                    src={`http://localhost:3000${members[message.userId][0].image}`} />
                </Grid>
                <Grid item>
                  <Grid container direction="column"
                    alignItems={message.userId === userId ? "flex-end" : "flex-start"}>
                    <Grid item>
                      <Typography variant="caption" gutterBottom>
                        {`${members[message.userId][0].firstName} ${members[message.userId][0].lastName}`}
                        &nbsp;&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;&nbsp;
                        {new Date(message.createdAt).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        className="message-chip"
                        label={message.text}
                        color={message.userId === userId ? "primary" : "default"}>
                      </Chip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))
          }
        </div>
        <div className="message-input-container">
          {
            !loading &&
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <Grid container alignItems="center">
                <Grid item xs sm md>
                  <TextField
                    required
                    placeholder="Enter your message"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={message}
                    onChange={this.handleChange("message")}
                    onFocus={this.updateMessages}>
                  </TextField>
                </Grid>
                <Grid item>
                  <IconButton type="submit" variant="contained" color="primary">
                    <Send />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
