import React, {Component} from "react";
import ReactDOM from "react-dom";
import {
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  TextField
} from "@material-ui/core";
import {Send} from "@material-ui/icons";
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
  messages: state.room.messages
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
      message: ""
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
    return {
      loading: props.loading,
      room: props.room,
      messages: props.messages
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
      message
    } = this.state;

    return (
      <div className="gis-room">
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
                key={message.id}
                justify={message.userId === userId ? "flex-end" : "flex-start"}>
                <Grid item>
                  <Chip
                    className="message-chip"
                    label={message.text}
                    color={message.userId === userId ? "primary" : "default"}>
                  </Chip>
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
