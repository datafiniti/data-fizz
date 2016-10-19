import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ActionInput from 'material-ui/svg-icons/action/input';
import TextInput from '../text_input';

const form = reduxForm({
  form: 'signup',
  validate,
});

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    // this.props.signupUser({ email, password });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <Field name="email" component={TextInput} label="Email" />
        </div>
        <div>
          <Field name="password" component={TextInput} label="Password"/>
        </div>
        <div>
          <Field name="passwordConfirm" component={TextInput} label="Confirm Password"/>
        </div>
        <RaisedButton
          label="Sign Up"
          labelPosition="before"
          primary={true}
          icon={<ActionInput />}
        />
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
