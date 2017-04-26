import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../components/auth/redux/reducer';
import users from '../components/admin/users/redux/reducer';
import products from '../components/admin/inventory/redux/products/reducer';

const rootReducer = combineReducers({
	auth: auth,
	users: users,
    products: products,
	form: formReducer,
});

export default rootReducer;