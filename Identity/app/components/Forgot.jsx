import React from 'react'
import { connect } from 'react-redux'
import ForgotForm from 'ForgotForm'
import { setResetAuth } from 'actions'

export let Forgot = React.createClass({
  handleSubmit(credentials) {
    console.log("hey hey I'm credentialed", credentials)
    let { dispatch } = this.props
    return dispatch(setResetAuth(credentials))
  },
  render() {
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-6 large-4">
          <ForgotForm onSubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
});

export default connect()(Forgot)