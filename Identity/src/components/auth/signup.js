import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';
import ActionInput from 'material-ui/svg-icons/action/input';

const form = reduxForm({
  form: 'signup',
  validate,
});

class Signup extends Component {
  handleFormSubmit({ email, password, name, phoneNumber }) {
    // Call action creator to sign up user
    this.props.signupUser({ email, password, name, phoneNumber });
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
          <Field name="name" component={TextInput} type="text" label="Name" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="phoneNumber" component={TextInput} type="text" label="Phone Number" />
        </fieldset>
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
        <SubmitButton label="Sign Up" icon={<ActionInput />} />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = [ 'email', 'password', 'passwordConfirm', 'name', 'phoneNumber' ];
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid. Correct format: user@example.com';
  }
  if (values.phoneNumber && !/\d{3}-\d{3}-\d{4}$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Invalid. Correct format: 123-456-7890';
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
