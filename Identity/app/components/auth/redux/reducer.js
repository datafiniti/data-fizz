import * as types from './actions';

const INTIIAL_STATE = {
	isAuthenticated: false,
	loading: false,
	user: null,
	error: null,
	status: null,
};

export default function authReducer(state = INTIIAL_STATE, action) {
	switch (action.type) {
		case types.SIGNUP_USER:
			return {
				...state,
				isAuthenticated: false,
				loading: true,
			};

		case types.SIGNUP_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
				status: 'authenticated',
			};


		case types.SIGNUP_USER_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				error: action.payload,
			};

		case types.LOGIN_USER: 
			return {
				...state,
				isAuthenticated: false,
				loading: true,
			};
		

		case types.LOGIN_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
				status: 'authenticated',
			};
		
		case types.LOGIN_USER_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				error: action.payload,
			};

		case types.LOGOUT_USER:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: false,
				error: null,
				status: null,
			};

		default:
			return state;
	}
}

