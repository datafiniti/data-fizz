import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';

const validate = (values) => {
  const errors = {}
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email Address';
  }
  return errors;
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

export let ForgotForm = React.createClass({
  render() {
    const { handleSubmit, pristine, reset, submitting, emailError } = this.props
    const renderErrorMessage = () => {
      if (emailError) return <div className="[success alert secondary] [round radius] label errorWarning">No email found!</div>
    }
    return (
      <div>
        <h3>Forgot your password?</h3>
        <div>Submit your email to receive a verification code to update your password</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="email" type="email" component={renderTextField} label="Email"/>
            </div>
            {renderErrorMessage()}
            <div className="resetSubmit">
              <button className="button expanded" type="submit" disabled={submitting}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

ForgotForm = reduxForm({
  form: 'forgot',
  fields: ['email'],
  validate
})(ForgotForm)

export default connect(
  (state) => {
    return { emailError: state.resetPassword.error }
  }
)(ForgotForm)