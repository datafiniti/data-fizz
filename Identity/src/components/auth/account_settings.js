import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';
import uuid from 'uuid';

const form = reduxForm({
  form: 'change-user-info',
  validate,
  enableReinitialize: true,
});

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKnownPassword: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchUser();
  }
  handleFormSubmit(formValues) {
    // Call action creator to sign up user
    this.props.updateUser(formValues);
  }
  renderFields() {
    const { editingKnownPassword } = this.state;
    const names = editingKnownPassword ?
      ['password', 'newPassword', 'newPasswordConfirm']
      : ['name', 'phoneNumber', 'email'];
    const labels = editingKnownPassword ?
      ['Current Password', 'New Password', 'Confirm New Password']
      : ['Name', 'Phone Number', 'Email'];
    const type = editingKnownPassword ? 'password' : 'text';
    return [
      <fieldset className="form-group" key={uuid()}>
        <Field name={names[0]} component={TextInput} type={type} label={labels[0]} />
      </fieldset>,
      <fieldset className="form-group" key={uuid()}>
        <Field name={names[1]} component={TextInput} type={type} label={labels[1]} />
      </fieldset>,
      <fieldset className="form-group" key={uuid()}>
        <Field name={names[2]} component={TextInput} type={type} label={labels[2]} />
      </fieldset>,
    ];
  }
  renderAlert() {
    const { errorMessage, clearAuthError } = this.props;
    if (errorMessage) {
      return <ErrorDialog errorMessage={errorMessage} clearAuthError={clearAuthError} />;
    }
    return '';
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <h1>My Account Settings</h1>
        {this.renderFields()}
        {this.renderAlert()}
        <SubmitButton disabled={pristine || submitting} label="Save" />
        <SubmitButton
          type="button"
          onClick={() => this.setState({ editingKnownPassword: !this.state.editingKnownPassword })}
          label={this.state.editingKnownPassword ? 'Cancel' : 'Change Password'}
        />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['name', 'phoneNumber', 'email',
    'password', 'newPassword', 'newPasswordConfirm'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    && !errors.email) {
    errors.email = 'Invalid. Correct format: user@example.com';
  }
  if (values.phoneNumber && !/\d{3}-\d{3}-\d{4}$/.test(values.phoneNumber)
    && !errors.phoneNumber) {
    errors.phoneNumber = 'Invalid. Correct format: 123-456-7890';
  }
  if ((values.password === values.newPassword || values.password === values.newPasswordConfirm)
  && (!errors.password && !errors.newPassword)) {
    errors.password = 'Current password and new password cannot be the same.';
    errors.newPassword = 'Current password and new password cannot be the same.';
    errors.newPasswordConfirm = 'Current password and new password cannot be the same.';
  }
  if (values.newPassword !== values.newPasswordConfirm && !errors.password) {
    const passwordMatchError = 'New password and confirm must match';
    errors.newPassword = passwordMatchError;
    errors.newPasswordConfirm = passwordMatchError;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    user: state.auth.user,
    initialValues: state.auth.user,
  };
}

/* eslint react/prop-types: 0 */
AccountSettings.propTypes = {
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, actions)(form(AccountSettings));
