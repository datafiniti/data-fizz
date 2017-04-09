import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';

const rootReducer = combineReducers({
	auth: auth,
	form: formReducer,
});

export default rootReducer;