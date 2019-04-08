import React, {Component} from "react";
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import {
  Cancel
} from "@material-ui/icons";
import Select from "react-select";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import _ from "lodash";
import {
  getUserList,
  addRoom
} from "../../Actions/User";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  users: state.user.users
});

const mapDispatchToProps = (dispatch) => ({
  getUserList: () => { dispatch(getUserList()) },
  addRoom: (data, callback) => { dispatch(addRoom(data, callback)) }
});

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      users: [],
      members: [],
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
      users: _.map(
        _.reject(props.users, {id: cookies.get("mad").userId}),
        (user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id
        })
      )
    };
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSelect = (field) => (value) => {
    this.setState({
      [field]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    this.setState({
      submit: true
    });
    this.props.addRoom({
      name: this.state.name,
      type: "GROUP",
      members: _.union(_.map(this.state.members, "value"), [cookies.get("mad").userId])
    }, (data) => {
      this.props.handleForm("groupForm", false)();
      this.props.history.push(`/room/${data.id}`);
    });
  }

  render() {
    const {
      open,
      name,
      users,
      members,
      submit
    } = this.state;

    return (
      <Dialog className="ui-group-form"
        open={open}
        fullWidth
        maxWidth="sm">
          <form onSubmit={this.handleSubmit} autoComplete="off">
          <DialogTitle>Create new Group</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              fullWidth
              placeholder="Group name"
              margin="normal"
              label="Group name"
              value={name}
              onChange={this.handleChange("name")} />
            <Select
              options={users}
              value={members}
              onChange={this.handleSelect("members")}
              placeholder="Select users to add in this group"
              isMulti
              components={{
                Control: (props) => (
                  <TextField
                    fullWidth
                    InputProps={{
                      inputComponent: ({inputRef, ...props}) => (
                        <div ref={inputRef} {...props} />
                      ),
                      inputProps: {
                        inputRef: props.innerRef,
                        children: props.children,
                        className: "input-component",
                        ...props.innerProps
                      }
                    }}
                    {...props.selectProps.textFieldProps} />
                ),
                Menu: (props) => (
                  <Paper square {...props.innerProps}>{props.children}</Paper>
                ),
                MultiValue: (props) => (
                  <Chip
                    tabIndex={-1}
                    label={props.children}
                    onDelete={props.removeProps.onClick}
                    deleteIcon={<Cancel {...props.removeProps} />} />
                ),
                NoOptionsMessage: (props) => (
                  <Typography color="textSecondary" {...props.innerProps}>
                    {props.children}
                  </Typography>
                ),
                Option: (props) => (
                  <MenuItem
                    className="menu-item"
                    buttonRef={props.innerRef}
                    selected={props.isFocused}
                    componet="div"
                    {...props.innerProps}>
                    {props.children}
                  </MenuItem>
                ),
                Placeholder: (props) => (
                  <Typography color="textSecondary" {...props.innerProps}>
                    {props.children}
                  </Typography>
                ),
                ValueContainer: (props) => (
                  <div className="value-container">{props.children}</div>
                )
              }} />
          </DialogContent>
          <DialogActions>
            <Button color="default" onClick={this.props.handleForm("groupForm", false)}>
              Cancel
            </Button>
            {
              submit ?
              <Button variant="contained" color="primary">
                <CircularProgress size={24} />
              </Button> :
              <Button variant="contained" color="primary" type="submit">
                Done
              </Button>
            }
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm));
