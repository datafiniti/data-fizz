import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';
import ActionInput from 'material-ui/svg-icons/action/input';
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
      editingPassword: false,
    };
  }
  componentWillMount() {
    this.props.fetchUser();
  }
  handleFormSubmit(formValues) {
    // Call action creator to sign up user
    this.props.updateUser(formValues);
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
    const { handleSubmit, user, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h1>My Account Settings</h1>
        {
          this.state.editingPassword ?
          [
            <fieldset className="form-group" key={uuid()}>
              <Field name="password" component={TextInput} type="password" label="Current Password" />
            </fieldset>,
            <fieldset className="form-group" key={uuid()}>
              <Field name="newPassword" component={TextInput} type="password" label="New Password" />
            </fieldset>,
            <fieldset className="form-group" key={uuid()}>
              <Field name="newPasswordConfirm" component={TextInput} type="password" label="Confirm New Password" />
            </fieldset>,
          ]
          :
          [
            <fieldset className="form-group" key={uuid()}>
              <Field name="name" component={TextInput} value={user.name} type="text" label="Name" />
            </fieldset>,
            <fieldset className="form-group" key={uuid()}>
              <Field name="phoneNumber" component={TextInput} value={user.phoneNumber} type="text" label="Phone Number" />
            </fieldset>,
            <fieldset className="form-group" key={uuid()}>
              <Field name="email" component={TextInput} value={user.email} type="email" label="Email" />
            </fieldset>,
          ]
          }
        {this.renderAlert()}
        <SubmitButton disabled={pristine || submitting} label="Save" />
        <SubmitButton
          type="button"
          onClick={() => this.setState({editingPassword: !this.state.editingPassword})}
          label={this.state.editingPassword ? 'Cancel' : 'Change Password'}/>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = [ 'email', 'password', 'newPassword', 'newPasswordConfirm', 'name', 'phoneNumber' ];
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && !errors.email) {
    errors.email = 'Invalid. Correct format: user@example.com';
  }
  if (values.phoneNumber && !/\d{3}-\d{3}-\d{4}$/.test(values.phoneNumber) && !errors.phoneNumber) {
    errors.phoneNumber = 'Invalid. Correct format: 123-456-7890';
  }
  if ( (values.password === values.newPassword || values.password === values.newPasswordConfirm)
  && (!errors.password && !errors.newPassword) ) {
    errors.password = 'Current password and new password cannot be the same.'
    errors.newPassword = 'Current password and new password cannot be the same.'
    errors.newPasswordConfirm = 'Current password and new password cannot be the same.'
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

export default connect(mapStateToProps, actions)(form(AccountSettings));
