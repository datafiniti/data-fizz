import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from  'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';


class Login extends Component {

onSubmit({ email, password}) {

    this.props.login({ email, password})

  }

renderAlert(){
  if(this.props.errorMessage){
    return (
      <div className='alert alert-danger'>
        <strong>Oops!</strong>{this.props.errorMessage}
      </div>
      );
  }
}



    render() {
      const { fields:{email, password}, handleSubmit } = this.props


      return (
      <div className="top-margin">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }   className="form-horizontal panel-form">
                  <fieldset>
                    <div id="legend">
                      <legend className="">Sign In</legend>
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
                      <div className="controls">
                        <p onClick={() => {this.props.authError('')}}>Don't have an account?<Link to={'sign_up'}><strong>Sign Up</strong></Link></p>
                        <p onClick={() => {this.props.authError('')}}>Lost your password?<Link to={'resetpwd'}><strong>reset</strong></Link></p>
                        {this.renderAlert()}
                        <button className="btn btn-submit"  type="submit">Login</button>
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

  if(!values.email){
    errors.email = 'Please enter an email';
  }

  if(!values.password){
    errors.password = 'Please enter a password';
  }

  return errors;

}


function mapStateToProps(state){
  return {
    errorMessage: state.auth.error, //from rootReducer (index.js in reducers)
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email','password'],
  validate
},mapStateToProps,actions)(Login)
