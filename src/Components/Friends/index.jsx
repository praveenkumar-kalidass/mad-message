import React from "react";
import {connect} from "react-redux";
import {getAllFriends} from "../../Actions/Friends";

const mapStateToProps = (state) => (
  {
    friends: state.friends.friends
  }
);

const mapDispatchToProps = (dispatch) => ({
  getAllFriends: () => { dispatch(getAllFriends()) }
});

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      friends: props.friends
    });
  }

  componentDidMount() {
    this.props.getAllFriends();
  }

  render() {
    return (
      <div>
        Friends Page
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
