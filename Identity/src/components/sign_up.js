import { Link } from 'react-router';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';
import $ from 'jquery';

class SignUp extends Component {

  onSubmit(props) {
    this.props.signupUser(props)
  }

  render() {
    
    const { fields:{ name, email, password, passwordConfirm}, handleSubmit } = this.props
    
    return (
      <div className="card alt">
      
        <div className="toggle" onClick={ () => { $('.container').stop().addClass('active') }} ></div>
      
        <h1 className="title">Register
          <div className="close" onClick={ () => { $('.container').stop().removeClass('active') }} ></div>
        </h1>
    
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div className="input-container">
            <input {...name} type="text" id="Username" required="required"/>
            <label htmlFor="Username">Username</label>
            <div className="bar"></div>
          </div>

          <div className="input-container">
            <input {...email} type="text" id="Username" required="required"/>
            <label htmlFor="Username">Email</label>
            <div className="bar"></div>
            <div className='text-help' style={{color:'black'}}>
              {email.touched && email.error ? email.error : ''}
            </div>
          </div>
        
          <div className="input-container">
            <input {...password} type="password" id="Password" required="required"/>
            <label htmlFor="Password">Password</label>
            <div className="bar"></div>
            <div className='text-help' style={{color:'black'}}>
              {password.touched && password.error ? password.error : ''}
            </div>
          </div>
        
          <div className="input-container">
            <input {...passwordConfirm} type="password" id="Repeat Password" required="required"/>
            <label htmlFor="Repeat Password">Repeat Password</label>
            <div className="bar"></div>
          </div>
        
          <div className="button-container">
            <button><span>Next</span></button>
          </div>
        </form>
      </div>

    );
  };
};

//Form Validation

function validate(values){
  const errors = {};

    if (values.email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(values.email)) {
      errors.email = 'Please enter valid email';
    }
  }

  if(values.password !== values.passwordConfirm){
    errors.password = 'Passwords must match';
  }


  return errors;

}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error,
  }
}


export default reduxForm({
  form: 'signup',
  fields: ['name','email','password','passwordConfirm'],
  validate
},mapStateToProps,actions)(SignUp)