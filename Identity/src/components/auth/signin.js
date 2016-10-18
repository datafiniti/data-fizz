import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log('email:', email);
    console.log('password:', password);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <Field name="email" component="input" type="email" />
        </fieldset>
        <fieldset className='form-group'>
          <Field name="password" component="input" type="password" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
})(Signin);
