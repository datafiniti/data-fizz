'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout } from 'actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
const lightMuiTheme = getMuiTheme(lightBaseTheme);


export let App = React.createClass({
  render () {
    let { dispatch } = this.props;
    let buttons = () => {
      if (this.props.location.pathname === '/bill') {
        return (
          <div className="top-bar-right">
            <ul className="menu">
              <li className="menu-text"></li>
              <li>
                <Link to={'/settings'}><button className="button">Settings</button></Link>
              </li>
              <li>
                <button className="button" onClick={() => {dispatch(logout())}}>Logout</button>
              </li>
            </ul>
          </div>
        );
      }
    }
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          <div className="top-bar">
            <div className="top-bar-left">
              <ul className="menu">
                <li className="menu-text">DataFiniti</li>
              </ul>
            </div>
            {buttons()}
          </div>
        {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
})

export default connect()(App)