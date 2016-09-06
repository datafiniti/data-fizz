import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export let Login = React.createClass({
  render() {
    const { dispatch } = this.props
    return (
      <div>
        <div className="row home">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="homeButtons">
              <Link to={'/signup'}><button className="button expanded homeButton"
                onClick={() => { dispatch({type: 'CLEAR_LOGIN'}) }}>Sign Up</button></Link>
              <Link to={'/login'}><button className="button expanded homeButton"
                onClick={() => { dispatch({type: 'CLEAR_LOGIN'}) }}>Login</button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default connect()(Login)