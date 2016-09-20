import React, {Component} from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';
import $ from 'jquery';

class ResetPwd extends Component {

  onSubmit({email}){
    this.props.resetPwd({email})
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

  render(){
    
    const { fields:{email}, handleSubmit } = this.props

    return (
      <div className="card malt">
        <h1 className="title">Reset Password
          <div className="close" onClick={ () => { $('.container').stop().removeClass('active') }}></div>
        </h1>
        
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div className="input-container">
            <input {...email} type="text" id="Username" required="required"/>
            <label htmlFor="Username">Email</label>
            <div className="bar"></div>
            <div className='text-help' style={{color:'red'}}>
              {email.touched && email.error ? email.error : ''}
            </div>
          </div>
        
          <div className="button-container">
            <button><span>Reset</span></button>
          </div>
          <br/>
          {this.renderAlert()}
        </form>
      </div>
    )
  }
}

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
    errorMessage: state.auth.error, //from rootReducer (index.js in reducers)
  }
}


export default reduxForm({
  form: 'reset',
  fields: ['email'],
  validate
},mapStateToProps,actions)(ResetPwd)