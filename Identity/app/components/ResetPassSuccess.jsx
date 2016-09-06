import React from 'react';
import { Link } from 'react-router';
import { replace } from 'react-router-redux'
import { connect } from 'react-redux';

export let ResetPassSuccess = React.createClass({
  render() {
    const { dispatch } = this.props
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-6 large-4">
          <div className="success label errorWarning"> Password Successfully updated! </div>
          <div>
            <Link to={'/login'}><button className="button expanded navButton"
              onClick={()=> { dispatch(replace('/login')) }}>To Login Page</button></Link>
          </div>
        </div>
      </div>
    );
  }
});

export default connect()(ResetPassSuccess)