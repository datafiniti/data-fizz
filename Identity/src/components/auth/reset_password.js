import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';
import ActionInput from 'material-ui/svg-icons/action/input';
import * as actions from '../../actions';

const form = reduxForm({
  form: 'reset-password',
  validate,
});

class ResetPassword extends Component {
  handleFormSubmit({ email, password }) {
    // Call action creator to sign in user
    // this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <ErrorDialog />
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h1>No worries!</h1>
        <em>
          Enter your email and one more time to confirm it
          and we'll send you an email with a link to reset your password.
        </em>
        <fieldset className="form-group">
          <Field name="email" component={TextInput} type="email" label="Email" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="emailConfirm" component={TextInput} type="email" label="Confirm Email" />
        </fieldset>
        {this.renderAlert()}
        <SubmitButton label="Submit" />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = [ 'email' ];
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.emailConfirm && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailConfirm)) {
    errors.emailConfirm = 'Invalid email address';
  }
  if (values.email !== values.emailConfirm && !errors.emailConfirm && !errors.email) {
    const emailMatchError = 'Emails must match';
    errors.email = emailMatchError;
    errors.emailConfirm = emailMatchError;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps, actions)(form(ResetPassword));
