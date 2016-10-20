import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CommentBox from './comment_box';
import CommentList from './comment_list';
// import UserList from './user_list';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchData();
  }
  render() {
    return (
      <div>
        {this.props.auth.message}
        <CommentBox />
        <CommentList />
      </div>
    );
  }
}
// <UserList />

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(Feature);
