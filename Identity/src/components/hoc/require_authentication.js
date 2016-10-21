import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* eslint react/prop-types: 0 */
export default function (ComposedComponent) {
  class Authentication extends Component {
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
    redirectNotAuthenticated() {
      // replace with snackbar/dialog then redirect
      browserHistory.push('/');
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}
