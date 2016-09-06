import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui';
import { connect } from 'react-redux'


const validate = (values) => {
  const errors = {}
  if (!values.emailNew) {
    errors.emailNew = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailNew)) {
    errors.emailNew = 'Invalid Email Address'
  }

  if (!values.emailVerify) {
    errors.emailNew = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailVerify)) {
    errors.emailVerify = 'Invalid Email Address'
  } else if (values.emailNew != values.emailVerify) {
    errors.emailVerify = 'Emails must match'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.passwordOld) {
    errors.passwordOld = 'Required'
  }

  if (values.passwordNew !== values.passwordVerify) {
    errors.passwordVerify = 'Passwords must match'
  }

  if (values.passwordNew) {
    if (values.passwordNew.length < 6) {
      errors.passwordNew = "Password length must be at least 6 characters"
    }
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    className="loginForm"
    style={{
      width: '100%'
    }}
  />
)

export let NewEmailForm = React.createClass({
  render() {
    const { handleSubmit, pristine, reset, submitting, infoToUpdate, updateError } = this.props
    const renderErrorMessage = () => {
      if (updateError) return <div className="warning"> Invalid Credentials! </div>
    };
    const renderSubmit = () => {
      if (infoToUpdate==='Email' || infoToUpdate==='Password') {
        return (
          <div className="updateButtons">
            <button className="button updateButton" type="submit" disabled={submitting}>Submit</button>
            <button className="button updateButton" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        )
      }
    }
    const renderForm = () => {
      switch (infoToUpdate) {
        case 'Email':
          return (
            <div>
              <Field name="emailNew" type="email" component={renderTextField} label="New Email"/>
              <Field name="emailVerify" type="email" component={renderTextField} label="Verify New Email"/>
              <Field name="password" type="password" component={renderTextField} label="Password"/>
            </div>
          )
        case 'Password':
          return (
            <div>
              <Field name="passwordOld" type="password" component={renderTextField} label="Old Password"/>
              <Field name="passwordNew" type="password" component={renderTextField} label="New Password"/>
              <Field name="passwordVerify" type="password" component={renderTextField} label="Verify New Password"/>
            </div>
          )
        case 'EMAIL_SUCCESS':
          return (
            <div className="success label errorWarning">Email Updated!</div>
          )
        case 'PASSWORD_SUCCESS':
          return (
            <div className="success label errorWarning">Password Updated!</div>
          )
        default:
          return <div></div>
      }
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {renderForm()}
          {renderErrorMessage()}
          {renderSubmit()}
        </form>
      </div>
    )
  }
})

NewEmailForm = reduxForm({
  form: 'newEmailForm',
  fields: ['emailNew', 'emailVerify', 'password', 'passwordOld', 'passwordNew', 'passwordVerify'],
  validate
})(NewEmailForm)

export default connect(
  (state)=> {
    console.log("SETTINGSUPDATESTATE", state)
    return { infoToUpdate: state.infoToUpdate }
  }
)(NewEmailForm)


