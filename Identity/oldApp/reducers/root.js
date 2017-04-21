import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import password from './password';

const rootReducer = combineReducers({
	auth: auth,
	password: password,
	form: formReducer,
});

export default rootReducer;