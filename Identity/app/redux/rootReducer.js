import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../components/auth/redux/reducer';
import users from '../components/admin/users/redux/reducer';

const rootReducer = combineReducers({
	auth: auth,
	users: users,
	form: formReducer,
});

export default rootReducer;