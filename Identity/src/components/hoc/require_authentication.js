import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(ComposedComponent) {
  class Authentication extends Component {
    redirectNotAuthenticated() {
      // replace with snackbar/dialog then redirect
      browserHistory.push('/');
    }
    componentWillMount() {
      if (!this.props.authenticated) {
        this.redirectNotAuthenticated();
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.redirectNotAuthenticated();
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, };
  }
  return connect(mapStateToProps)(Authentication);
}
