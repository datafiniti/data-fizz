import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  comments: commentsReducer,
  authenticated: authenticationReducer,
});

export default rootReducer;
