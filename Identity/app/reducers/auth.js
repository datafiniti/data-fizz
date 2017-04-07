import * as types from '../actions/auth';

export default function authReducer(state = {}, action) {
	switch (action.type) {
		case types.USER_SIGNUP_COMPLETE:
			return action.user;
		default:
			return state;
	}
}