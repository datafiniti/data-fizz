import React from 'react';
import CommentBox from './comment_box';
import CommentList from './comment_list';
import UserList from './user_list';
import Header from './header';

export default () => {
  return (
    <div>
      <UserList />
      <CommentBox />
      <CommentList />
    </div>
  );
}
