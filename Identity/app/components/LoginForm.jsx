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

export let LoginForm = React.createClass({
  render() {
    const { handleSubmit, pristine, reset, submitting, loginError } = this.props
    const renderErrorMessage = () => {
      if (loginError) return <div className="[success alert secondary] [round radius] label errorWarning"> Invalid Credentials! </div>
    }
    return (
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <Field name="email" type="email" component={renderTextField} label="Email"/>
            </div>
            <div>
              <Field name="password" type="password" component={renderTextField} label="Password"/>
            </div>
            {renderErrorMessage()}
            <div className="LoginSubmit">
              <button className="button expanded" type="submit" disabled={submitting}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate
})(LoginForm)

export default connect(
  (state) => {
    return { loginError: state.session.error }
  }
)(LoginForm)