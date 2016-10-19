import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticationReducer from './authentication';
import usersReducer from './users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  form: formReducer,
  comments: commentsReducer,
  users: usersReducer,
});

export default rootReducer;
