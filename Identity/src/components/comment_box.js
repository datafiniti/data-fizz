import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'; // shortcut or alternative to creating mapDispatchToProps function

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ comment: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.saveComment(this.state.comment);
    this.setState({ comment: '' });
  }
  render() {
    return (
      <form className='comment-box' onSubmit={this.handleSubmit}>
        <h4>Add A Comment</h4>
        <textarea
          value={this.state.comment}
          onChange={this.handleChange} />
        <div>
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

export default connect(null, actions)(CommentBox);
