import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  authButton() {
    const { authenticate, authenticated } = this.props;
    return (
      <button onClick={() => authenticate(!authenticated)}>
        { authenticated ? 'Sign Out' : 'Sign In'}
      </button>
    );
  }

  render() {
    return (
      <nav className='header navbar navbar-light'>
        <ul className='nav navbar-nav'>
          <li className='nav-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/resources'>Resources</Link>
          </li>
          <li className='nav-item'>
            {this.authButton()}
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
  }
}

export default connect(mapStateToProps, actions)(Header);
