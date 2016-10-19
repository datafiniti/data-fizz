import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';

const form = reduxForm({
  form: 'signup',
  validate,
});

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    // Call action creator to sign up user
    this.props.signupUser({ email, password });
  }
  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <ErrorDialog />
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" component={TextInput} type="email" label="Email" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" component={TextInput} type="password" label="Password" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="passwordConfirm" component={TextInput} type="password" label="Confirm Password"/>
        </fieldset>
        {this.renderAlert()}
        <SubmitButton label="Sign Up" />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = [ 'email', 'password', 'passwordConfirm' ];
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.password !== values.passwordConfirm) {
    const passwordMatchError = 'Passwords must match';
    errors.password = passwordMatchError;
    errors.passwordConfirm = passwordMatchError;
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(form(Signup));
