import * as types from '../actions/users';


const INITIAL_STATE = {
	user: null,
	status: null,
	error: null,
	loading: false,
};

export default function (state = INITIAL_STATE, action) {
	let error;

	switch (action.type) {
		case types.ME_FROM_TOKEN:
			return {
				...state,
				user: null,
				status: 'storage',
				error: null,
				loading: false,
			};

		case types.ME_FROM_TOKEN_SUCCESS:
			return {
				...state,
				user: action.payload,
				status: 'authenticated',
				error: null,
				loading: false,
			};

		case types.ME_FROM_TOKEN_FAILURE:
			error = action.payload.data || { message: action.payload.data.res.message };

			return {
				...state,
				user: null,
				status: 'storage',
				error: error,
				loading: false,
			};

		case types.RESET_TOKEN:
			return {
				...state,
				user: null,
				status: 'storage',
				error: null,
				loading: false,
			};

		case types.RESET_USER:
			return {
				...state,
				user: null,
				status: null,
				error: null,
				loading: false,
			};

		case types.LOGOUT_USER:
			return {
				...state,
				user: null,
				status: null,
				error: null,
				loading: false,
			};

		default:
			return state;
	}
}