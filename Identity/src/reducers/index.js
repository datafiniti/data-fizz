import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticationReducer from './authentication';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  form: formReducer,
  comments: commentsReducer,
});

export default rootReducer;
