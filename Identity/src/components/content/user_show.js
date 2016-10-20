import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'; // shortcut or alternative to creating mapDispatchToProps function

export default ({user}) => (
  <div className="card card-block" key={user._id}>
    <h4 className="card-title">{user.name}</h4>
    <p className="card-text">{user.phoneNumber}</p>
    <p className="card-text">{user.email}</p>
  </div>
);
