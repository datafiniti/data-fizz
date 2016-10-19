import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ActionInput from 'material-ui/svg-icons/action/input';
import TextInput from '../text_input';

const form = reduxForm({
  form: 'signin',
  validate,
});

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  render() {
    const { handleSubmit } = this.props;
    console.log(this.props);
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" component={TextInput} type="email" placeholder="Email" />
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" component={TextInput} type="password" placeholder="Password" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
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
