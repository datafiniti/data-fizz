import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from  'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';
import SignUp from './sign_up';
import ResetPwd from './reset_pwd';
import $ from 'jquery';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    }; 
  }

  HandleOnClick(){
    this.setState({
      showModal: true
    })
  }

  CloseModal(){
    this.setState({
      showModal : false
    })
  }

  Modal (){
    if (this.state.showModal){
      return <ResetPwd closeModal={this.CloseModal.bind(this)} />
    }
  }

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
      <div>
      {this.Modal()}
      <div className="container">  
        <div className="card"></div>

        <div className="card">
          <h1 className="title">Login</h1>
          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <div className="input-container">
              <input {...email} type="text" id="Username" required="required"/>
              <label htmlFor="Username">Email</label>
              <div className="bar"></div>
              <div className='text-help' style={{color:'red'}}>
                {email.touched && email.error ? email.error : ''}
              </div>
            </div>
      
            <div className="input-container">
              <input {...password} type="password" id="Password" required="required"/>
              <label htmlFor="Password">Password</label>
              <div className="bar"></div>
            </div>
            
            <div className="button-container">
              <button><span>Go</span></button>
            </div>
            <div onClick={() => {this.props.authError('')}}className="footer"><p onClick={() => {this.HandleOnClick()}}>Forgot your password?</p>
            {this.renderAlert()}
            </div>
          </form>
        </div>

        <SignUp/>
      </div>
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

  return errors;

}


function mapStateToProps(state){
  return {
    errorMessage: state.auth.error,
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email','password'],
  validate
},mapStateToProps,actions)(Login)
