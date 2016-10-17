import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

const CommentList = ({comments}) => {
  const list = comments.map(comment => <li key={uuid()}>{comment}</li>);
  return (
    <ul className='comment-list'>
      {list}
    </ul>
  );
}

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(mapStateToProps)(CommentList);
