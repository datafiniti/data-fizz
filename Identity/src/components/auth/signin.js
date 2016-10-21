import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import TextInput from '../common/text_input';
import SubmitButton from '../common/submit_button';
import ErrorDialog from '../common/error_dialog';
import ActionInput from 'material-ui/svg-icons/action/input';

const form = reduxForm({
  form: 'signin',
  validate,
});

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit({ email, password }) {
    // Call action creator to sign in user
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    const { errorMessage, clearAuthError } = this.props;
    if (errorMessage) {
      return <ErrorDialog errorMessage={errorMessage} clearAuthError={clearAuthError} />;
    }
    return '';
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <Field name="email" component={TextInput} type="email" label="Email" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" component={TextInput} type="password" label="Password" />
        </fieldset>
        {this.renderAlert()}
        <SubmitButton label="Sign In" icon={<ActionInput />} />
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  clearAuthError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, actions)(form(Signin));
