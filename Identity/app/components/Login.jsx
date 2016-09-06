import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from 'actions'
import LoginForm from 'LoginForm'

export let Login = React.createClass({
  handleSubmit(credentials) {
    let { dispatch } = this.props;
    return dispatch(login(credentials));
  },
  render() {
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-6 large-4">
          <h3>Login</h3>
          <LoginForm onSubmit={this.handleSubmit} />
          <Link to={'/forgot'}><button className="button expanded">Forgot your password?</button></Link>
        </div>
        <div className="columns small-centered small-10 medium-6 large-4">
        </div>
      </div>
    );
  }
});

export default connect()(Login)