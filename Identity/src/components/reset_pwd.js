import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ResetPwd extends Component {

  constructor(props) {
    super(props);

    this.state = { email: ""};

  }

  onSubmit(){
    const email = this.state.email;
    this.props.resetPwd(email)
  }

  render(){
    return (
      <div>
        <input
          type="text"
          placeholder="type your email!"
            value={this.state.email}
            onChange={(event)=> this.setState({ email: event.target.value })}
          />
        <button onClick={() => {this.onSubmit.bind(this)} }> Request password reset </button>
      </div>
    )
  }
}


export default connect(null,actions)(ResetPwd);