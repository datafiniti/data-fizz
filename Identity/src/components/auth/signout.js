import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser(this.props.auth.userId);
  }
  render() {
    return <div>Sorry to see you go...</div>;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Signout);
