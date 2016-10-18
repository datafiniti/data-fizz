import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticationReducer from './authentication';
import usersReducer from './users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  comments: commentsReducer,
  authenticated: authenticationReducer,
  users: usersReducer,
  form: formReducer,
});

export default rootReducer;
