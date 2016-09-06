import React from 'react';
import { Link } from 'react-router';
import { checkIfSession } from 'actions';
import { connect } from 'react-redux';

export let Bill = React.createClass({
  render() {
    let { dispatch } = this.props;
    dispatch(checkIfSession());
    return (
      <div className="row">
        <div className="columns small-centered small-10 medium-6 large-4">
          <img id="bill" src="http://vignette2.wikia.nocookie.net/ghostbusters/images/1/11/Bill_Murray.jpeg/revision/latest?cb=20081013140955"/>
          <div id="quote">" "You are awesome!" -Bill Murray" -Brinn Riordan </div>
        </div>
      </div>
    );
  }
});

export default connect()(Bill)
