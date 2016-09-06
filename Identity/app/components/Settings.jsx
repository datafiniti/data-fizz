import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { selectToUpdate, clearToUpdate, changeInfo } from 'actions';
import { initialize } from 'redux-form';
import NewEmailForm from 'SettingsUpdate'

export const Settings = React.createClass({
  handleSubmit(data) {
    const update = data.emailNew != undefined ? {
      id: this.props.session.id,
      password: data.password,
      emailNew: data.emailNew,
      info: 'email'
    } : {
      id: this.props.session.id,
      password: data.passwordOld,
      passwordNew: data.passwordNew,
      info: 'password'
    };
    return this.props.dispatch(changeInfo(update))
  },
  render() {
    const {dispatch, infoToUpdate} = this.props;
    console.log("HEY IM THE PROPS", this.props);
    const renderMessage = () => {
      if (infoToUpdate === 'EMAIL_SUCCESS' || infoToUpdate === 'PASSWORD_SUCCESS') {
        return 'OK'
      } else {
        return 'Cancel'
      }
    }
    const renderTitle = () => {
      if (infoToUpdate==="Password" || infoToUpdate==="Email") return <h3 className="updateTitle"> Update {infoToUpdate} </h3>
    }
    const renderSelect = () => {
      if (infoToUpdate==="Password" || infoToUpdate==="Email" || infoToUpdate==='') return (
        <div>
          <button className="button selectUpdate" activeClassName="active"
            activeStyle={{fontWeight: 'bold'}} ref="email" value="Email"
            onClick={()=>{ dispatch(selectToUpdate(this.refs.email.value))}}>Email</button>
          <button className="button selectUpdate" activeClassName="active"
            activeStyle={{fontWeight: 'bold'}} ref="password" value="Password"
            onClick={()=>{ dispatch(selectToUpdate(this.refs.password.value))}}>Password</button>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-8 large-6">
          {renderSelect()}
          {renderTitle()}
          <div>
            <NewEmailForm onSubmit={this.handleSubmit}/>
          </div>
          <div>
            <Link to={'/bill'}><button className="button expanded navButton"
              onClick={()=>{dispatch(clearToUpdate())}}>{renderMessage()}</button></Link>
          </div>
        </div>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return state;
  }
)(Settings)
