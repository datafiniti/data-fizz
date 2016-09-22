import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import ChangePwd from './change_pwd';

class Dashboard extends Component {

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
      return <ChangePwd closeModal={this.CloseModal.bind(this)} />
    }
  }

  render(){
    return (
      <div id='menu-nav'>
      {this.Modal()}
        <div id='navigation-bar'>
          <ul>
            <li className='menu-sub-nav current-item'><p><i className='fa fa-home'></i><span>Home</span></p></li>
            <li onClick={() => {this.HandleOnClick()}} className='menu-sub-nav'><p><i className='fa fa-cogs'></i><span>Change password</span></p></li>
            <li onClick={this.props.signoutUser.bind(this)} className='menu-sub-nav'><p><i className='fa fa-user'></i><span>Logout</span></p></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(null,actions)(Dashboard);