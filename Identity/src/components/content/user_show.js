import React, { PropTypes } from 'react';

const UserShow = ({ user }) => (
  <div className="card card-block" key={user._id}>
    <h4 className="card-title">{user.name}</h4>
    <p className="card-text">{user.phoneNumber}</p>
    <p className="card-text">{user.email}</p>
  </div>
);

UserShow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserShow;
