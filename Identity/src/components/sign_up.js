import { Link } from 'react-router';
import { connect } from  'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';


class SignUp extends Component {

renderAlert(){
  if(this.props.errorMessage){
    return (
      <div className='alert alert-danger'>
        <strong>Oops!</strong>{this.props.errorMessage}
      </div>
      );
  }
}

onSubmit(props) {

    this.props.signupUser(props)

  }

    render() {
      const { fields:{ name, email, password, passwordConfirm}, handleSubmit } = this.props


      return (
      <div className="top-margin">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }   className="form-horizontal panel-form">
                  <fieldset>
                    <div id="legend">
                      <legend className="">Sign Up</legend>
                    </div>

                     <div className="control-group">
                      <label className="control-label">Name</label>
                      <div className="controls">
                        <input {...name}
                          className="form-control input-lg"
                    type='text'
                    placeholder='type your name'
                    />
                    <div className='text-help' style={{color:'red'}}>
                  {name.touched && name.error ? name.error : ''}
                </div>
                      </div>
                    </div>


                    <div className="control-group">
                      <label className="control-label">Email</label>
                      <div className="controls">
                        <input {...email}
                          className="form-control input-lg"
                    type='text'
                    placeholder="type your email"
                    />
                    <div className='text-help' style={{color:'red'}}>
                  {email.touched && email.error ? email.error : ''}
                </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label">Password</label>
                      <div className="controls">
                        <input {...password}
                          className="form-control input-lg"
                    type="password"
                    placeholder="type your password"
                  />
                  <div className='text-help' style={{color:'red'}}>
                  {password.touched && password.error ? password.error : ''}
                </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label">Confirm Password</label>
                      <div className="controls">
                        <input {...passwordConfirm}
                          className="form-control input-lg"
                    type="password"
                    placeholder="confirm your password"
                  />
                  <div className='text-help' style={{color:'red'}}>
                  {passwordConfirm.touched && passwordConfirm.error ? passwordConfirm.error : ''}
                </div>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="controls">
                        <p>Already have an account?<Link to={'/'}><strong>Sign In</strong></Link></p>
                        {this.renderAlert()}
                        <button className="btn btn-submit"  type="submit">Sign up</button>
                      </div>
                    </div>
                </fieldset>
              </form>
          </div>
        </div>
      </div>
    </div>
      );
    };
};

//Form Validation

function validate(values){
  const errors = {};

  if(!values.name){
    errors.name = 'Please enter a name';
  }

  if(!values.email){
    errors.email = 'Please enter an email';
  }

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

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error, //from rootReducer (index.js in reducers)
  }
}


export default reduxForm({
  form: 'signup',
  fields: ['name','email','password','passwordConfirm'],
  validate
},mapStateToProps,actions)(SignUp)