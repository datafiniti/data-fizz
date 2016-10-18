import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    // add contextTypes on a class level property in order to have access to router
    static contextTypes = { router: PropTypes.object };
    redirectNotAuthenticated() {
      // replace with toastr then redirect
      this.context.router.push('/');
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
    return { authenticated: state.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}
