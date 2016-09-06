import React from 'react'
import { connect } from 'react-redux'
import { checkResetAuth } from 'actions'
import ResetPassForm from 'ResetPassForm'

export let ResetPass = React.createClass({
  handleSubmit(credentials) {
    let { dispatch } = this.props
    return dispatch(checkResetAuth(credentials))
  },
  render() {
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-6 large-4">
          <h3>Check your email for the Verification Code required to update your password</h3>
          <ResetPassForm onSubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
});

export default connect()(ResetPass)