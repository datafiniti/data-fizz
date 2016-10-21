import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    const { signoutUser, auth } = this.props;
    if (auth.userId) {
      signoutUser(auth.userId);
    } else {
      browserHistory.push('/');
    }
  }
  render() {
    return <h1>Sorry to see you go...</h1>;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Signout);
