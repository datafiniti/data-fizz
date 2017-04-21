import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../components/auth/redux/reducer';

const rootReducer = combineReducers({
	auth: auth,
	form: formReducer,
});

export default rootReducer;