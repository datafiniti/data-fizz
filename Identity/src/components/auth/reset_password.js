import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';
import ActionInput from 'material-ui/svg-icons/action/input';
import * as actions from '../../actions';
import uuid from 'uuid';

const form = reduxForm({
  form: 'reset-password',
  validate,
});

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveResetPasswordToken: false,
    }
  }
  componentWillMount() {
    if (this.props.params.passwordResetToken) {
      this.setState({ haveResetPasswordToken: true });
    } else {
      this.setState({ haveResetPasswordToken: false });
    }
  }
  handleFormSubmit({ email, newPassword }) {
    const { passwordResetToken, userId } = this.props.params;
    // Call action creator to sign in user
    if (this.props.params.passwordResetToken) {
      this.props.updateUser({ newPassword, userId, passwordResetToken });
    } else {
      this.props.requestPasswordReset({ email });
    }
  }
  renderFields() {
    const { haveResetPasswordToken } = this.state;
    const names = haveResetPasswordToken ? ["newPassword", "newPasswordConfirm"] : ["email", "emailConfirm"];
    const labels = haveResetPasswordToken ? ["New Password", "Confirm New Password"] : ["Email", "Confirm Email"];
    const type = haveResetPasswordToken ? "password" : "email";
    return [
      <fieldset className="form-group" key={uuid()}>
        <Field name={names[0]} component={TextInput} type={type} label={labels[0]} />
      </fieldset>,
      <fieldset className="form-group" key={uuid()}>
        <Field name={names[1]} component={TextInput} type={type} label={labels[1]} />
      </fieldset>,
    ];
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
        {this.renderFields()}
        {this.renderAlert()}
        <SubmitButton label="Submit" />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = [ 'email', 'emailConfirm', 'newPassword', 'newPasswordConfirm' ];
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
  if (values.newPassword !== values.newPasswordConfirm && !errors.newPassword && !errors.newPasswordConfirm) {
    const passwordMatchError = 'Passwords must match';
    errors.newPassword = passwordMatchError;
    errors.newPasswordConfirm = passwordMatchError;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps, actions)(form(ResetPassword));
