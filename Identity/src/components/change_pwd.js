import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';

class ChangePwd extends Component {


  onSubmit(props) {
    this.props.changePwd(props)
  }

  render(){
    const { fields:{password, passwordConfirm}, handleSubmit } = this.props
    return (
      <div className="top-margin">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
              <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }   className="form-horizontal panel-form">
                <fieldset>
                  <div id="legend">
                    <legend className="">Change your Password</legend>
                  </div>

                  <div className="control-group">
                    <label className="control-label">New Password</label>
                      <div className="controls">
                        <input {...password}
                          className="form-control input-lg"
                          type="password"
                          placeholder="type your new password"
                        />
                        <div className='text-help' style={{color:'red'}}>
                          {password.touched && password.error ? password.error : ''}
                        </div>
                      </div>
                  </div>

                  <div className="control-group">
                    <label className="control-label">Confirm New Password</label>
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

                  <button className="btn btn-submit"  type="submit">Change</button>

                  <Link to={'/dashboard'}>
                    <button className="btn btn-submit"  type="submit">Cancel</button>
                  </Link>

                </fieldset>
              </form>
            </div>
          </div>
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