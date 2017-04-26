import * as types from './actions';

const INTIIAL_STATE = {
	isAuthenticated: false,
	forgotPasswordOpen: false,
	loading: false,
	user: null,
	err: null,
	status: null,
	showNotification: false,
	notificationType: null,
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
				showNotification: true,
				notificationType: 'success',
			};

		case types.SIGNUP_USER_AFTER_SUCCESS:
			return {
				...state,
				showNotification: false,
				notificationType: null,
			};


		case types.SIGNUP_USER_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				err: action.payload,
				showNotification: true,
				notificationType: 'failure',
			};

		case types.SIGNUP_USER_AFTER_FAILURE:
			return {
				...state,
				showNotification: false,
				notificationType: null,
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
				showNotification: true,
				notificationType: 'success',
			};

		case types.LOGIN_USER_AFTER_SUCCESS:
			return {
				...state,
				showNotification: false,
				notificationType: null,
			};
		
		case types.LOGIN_USER_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				err: action.payload,
				status: null,
				showNotification: true,
				notificationType: 'failure',
			};

		case types.LOGIN_USER_AFTER_FAILURE:
			return {
				...state,
				showNotification: false,
				notificationType: null,
			};

		case types.LOGOUT_USER:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: false,
				err: null,
				status: null,
			};

		case types.LOAD_AUTH_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				status: 'authenticated',
			};

		case types.OPEN_FORGOT_PASSWORD:
			return {
				...state,
				forgotPasswordOpen: true,
			};

		case types.CLOSE_FORGOT_PASSWORD:
			return {
				...state,
				forgotPasswordOpen: false,
				loading: false,
				status: null,
				err: null,
			};

		case types.REQUEST_PASSWORD_CHANGE:
			return {
				...state,
				loading: true,
			};

		case types.REQUEST_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				status: 'token-sent',
			};

		case types.REQUEST_PASSWORD_FAILURE:
			return {
				...state,
				status: 'request-failed',
				loading: false,
				err: action.payload,
			};

		case types.RESET_PASSWORD:
			return {
				...state,
				status: null,
				loading: true,
				err: null,
			};

		case types.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				err: null,
				status: 'password-reset-success',
			};

		case types.RESET_PASSWORD_FAILURE:
			return {
				...state,
				loading: false,
				err: action.payload,
				status: 'password-reset-failed',
			};

		default:
			return state;
	}
}

