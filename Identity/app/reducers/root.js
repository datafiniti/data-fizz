import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
	auth: auth,
});

export default rootReducer;