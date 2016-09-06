import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const validate = (values) => {
  const errors = {}
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email Address';
  }
  if (!values.password) errors.password = 'Required';
  else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';

  return errors;
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

export let SignUpForm = React.createClass({
  render() {
    const { handleSubmit, pristine, reset, submitting, signupError } = this.props
    const renderErrorMessage = () => {
      if (signupError) return <div className="[success alert secondary] [round radius] label errorWarning"> Email already in use! </div>
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field name="email" type="email" component={renderTextField} label="Email"/>
          <Field name="password" type="password" component={renderTextField} label="Password"/>
          <Field name="username" type="text" component={renderTextField} label="Username"/>
          {renderErrorMessage()}
            <div className="LoginSubmit">
              <button className="button expanded" type="submit" disabled={submitting}>Submit</button>
            </div>
        </form>
        <div>
        </div>
      </div>
    );
  }
});

SignUpForm = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'username'],
  validate
})(SignUpForm)

export default connect(
  (state) => {
    return { signupError: state.session.error }
  }
)(SignUpForm)