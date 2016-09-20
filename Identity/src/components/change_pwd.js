import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import * as actions from '../actions/index';

class ChangePwd extends Component {


  onSubmit({ password }) {
    this.props.changePwd({ password })
    browserHistory.push('/dashboard');
  }

  render(){
    const { fields:{password, passwordConfirm}, handleSubmit } = this.props
    return (
      <div className="container">
        <div className="card"></div>  
        <div className="card">
          <h1 className=" alt title">Change your Password
            <div className="car alt tilte close" onClick={ () => { $('.container').stop().removeClass('active') }}></div>
          </h1>
          
          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <div className="input-container">
              <input {...password} type="password" id="Username" required="required"/>
              <label htmlFor="Username">New Password</label>
              <div className="bar"></div>
            </div>

            <div className="input-container">
              <input {...passwordConfirm} type="password" id="Username" required="required"/>
              <label htmlFor="Username">Repeat Password</label>
              <div className="bar"></div>
              <div className='text-help' style={{color:'red'}}>
                {passwordConfirm.touched && passwordConfirm.error ? passwordConfirm.error : ''}
              </div>
            </div>

            <div className="button-container">
              <button><span>Change</span></button>
            </div>
            <br/>
          </form>
        </div>
      </div>
    )
  }
}

//Form Validation

function validate(values){
  const errors = {};

  if(!values.password){
    errors.password = 'Please enter a password';
  }

  if(!values.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(values.password !== values.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;

}

export default reduxForm({
  form: 'changePwd',
  fields: ['password','passwordConfirm'],
  validate
},null,actions)(ChangePwd)