import React, {Component} from "react";
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
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.room.loading,
  room: state.room.room,
  messages: state.room.messages
});

const mapDispatchToProps = (dispatch) => ({
  getRoomDetails: (id) => { dispatch(getRoomDetails(id)) },
  startRoom: (id) => { dispatch(startRoom(id)) },
  stopRoom: (id) => { dispatch(stopRoom(id)) },
  sendMessage: (data) => { dispatch(sendMessage(data)) }
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
    const cookies = new Cookies();
    this.setState({
      userId: cookies.get("mad").userId
    });
    this.props.getRoomDetails(this.props.match.params.id);
    this.props.startRoom(this.props.match.params.id);
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
      this.props.getRoomDetails(this.props.match.params.id);
      this.props.startRoom(this.props.match.params.id);
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
                    onChange={this.handleChange("message")}>
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
