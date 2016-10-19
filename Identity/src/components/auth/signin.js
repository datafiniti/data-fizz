import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';

const form = reduxForm({
  form: 'signin',
  validate,
});

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Call action creator to sign in user
    this.props.signinUser({ email, password });
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
        {this.renderAlert()}
        <SubmitButton label="Sign In" />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = [ 'email', 'password' ];
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { signinUser })(form(Signin));
