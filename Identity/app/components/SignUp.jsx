import React from 'react';
let ReactDOM = require('react-dom');
let {connect} = require('react-redux');
import {signup} from 'actions';
import SignUpForm from 'SignUpForm';

export let SignUp = React.createClass({
  handleSubmit(credentials) {
    let { dispatch } = this.props;
    return dispatch(signup(credentials));
  },
  render() {
    let {dispatch} = this.props;
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-6 large-4">
          <h3>Sign up</h3>
          <SignUpForm onSubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
});

export default connect()(SignUp)