import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import users from './users';

const rootReducer = combineReducers({
	auth: auth,
	users: users,
	form: formReducer,
});

export default rootReducer;