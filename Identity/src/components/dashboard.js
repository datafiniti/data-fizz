import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Dashboard extends Component {


  render(){
    return (
      <div>
        dash
        <Link to={'/'}>
        <button onClick={this.props.signoutUser.bind(this)} >
        Log out
        </button>
        </Link>

        <Link to={'/changePwd'}>
        <button>
        Change your password
        </button>
        </Link>

      </div>
    )
  }
}

export default connect(null,actions)(Dashboard);