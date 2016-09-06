import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { replace } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

const validate = (values) => {
  const errors = {}
  if (!values.authcode) errors.authcode = 'Required'
  else if (values.authcode.length !== 6) errors.authcode = 'Verification codes are 6 digits long!'
  if (!values.passwordNew) errors.passwordNew = 'Required'
  else if (values.passwordNew.length < 6) errors.passwordNew = 'Passwords must be at least 6 characters long!'
  if (!values.passwordVerify) errors.passwordVerify = 'Required'
  if (values.passwordNew !== values.passwordVerify) errors.passwordVerify = "Passwords must match!"
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    className="forgotForm"
    style={{
      width: '100%'
    }}
  />
)

export let ResetPassForm = React.createClass({
  render() {
    const { handleSubmit, pristine, reset, submitting, authcodeError, didUpdate, dispatch } = this.props
    const renderErrorMessage = () => {
      if (authcodeError) return <div className="[success alert secondary] [round radius] label errorWarning">Invalid Verfication Code!</div>
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="authcode" type="text" component={renderTextField} label="Verfication Code"/>
          </div>
          <div>
            <Field name="passwordNew" type="password" component={renderTextField} label="New Password"/>
          </div>
          <div>
            <Field name="passwordVerify" type="password" component={renderTextField} label="Verify New Password"/>
          </div>
          {renderErrorMessage()}
          <div className="resetSubmit">
            <button className="button expanded" type="submit" disabled={submitting}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
});

ResetPassForm = reduxForm({
  form: 'resetPass',
  fields: ['authcode', 'passwordNew', 'passwordVerify'],
  validate
})(ResetPassForm)

export default connect(
  (state) => {
    return {
      authcodeError: state.resetPassword.error,
      didUpdate: state.resetPassword.success
    }
  }
)(ResetPassForm)