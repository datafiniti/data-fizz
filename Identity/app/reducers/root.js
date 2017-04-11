import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import users from './users';
import password from './password';

const rootReducer = combineReducers({
	auth: auth,
	users: users,
	password: password,
	form: formReducer,
});

export default rootReducer;