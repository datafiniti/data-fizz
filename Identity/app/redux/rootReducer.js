import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from 'auth/redux/reducer';
import users from 'users/redux/reducers/users';
import notifications from 'users/redux/reducers/notifications';
import settings from 'users/redux/reducers/settings';

const rootReducer = combineReducers({
	auth: auth,
	users: users,
    notifications: notifications,
    settings: settings,
	form: formReducer,
});

export default rootReducer;