import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Dashboard extends Component {


  render(){
    return (
      <div id='menu-nav'>
        <div id='navigation-bar'>
          <ul>
            <li className='menu-sub-nav current-item'><a href='/'><i className='fa fa-home'></i><span>Home</span></a></li>
            <li className='menu-sub-nav'><a href='/changePwd'><i className='fa fa-cogs'></i><span>Settings</span></a></li>
            <li onClick={this.props.signoutUser.bind(this)} className='menu-sub-nav'><a href='/'><i className='fa fa-user'></i><span>Logout</span></a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(null,actions)(Dashboard);