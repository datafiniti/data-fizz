import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import uuid from 'uuid';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={uuid()}>
          <Link className="nav-link" to={`/feature`}>Profile</Link>
        </li>,
        <li className="nav-item" key={uuid()}>
          <Link className="nav-link" to={`/account-settings/${this.props.userId}`}>Account Settings</Link>
        </li>,
        <li className="nav-item" key={uuid()}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item" key={uuid()}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={uuid()}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key={uuid()}>
          <Link className="nav-link" to="/reset-password">Forgot Your Password?</Link>
        </li>,
      ];
    }
  }
  render() {
    return (
      <div>
        <nav className="header navbar navbar-light">
          <Link to="/" className="navbar-brand">Home</Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps)(Header);
