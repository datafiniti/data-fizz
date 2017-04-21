import * as types from '../actions/users';

const INTIAL_STATE = {
	isLoading: false,
	error: null,
	fieldUpdated: false,
};

export default function userReducer(state = INTIAL_STATE, action) {
	let error;

	switch (action.type) {
		case types.EDIT_EMAIL:
			return {
				...state,
				isLoading: true,
			};

		case types.EDIT_EMAIL_SUCCESS:
			return {
				...state,
				isLoading: false,
				fieldUpdated: true,
			};

		case types.EDIT_EMAIL_FAILURE:
			error = action.payload.error || { message: action.payload.data.res.error};

			return {
				...state,
				isLoading: false,
				error: error,
				fieldUpdated: false
			};

		default:
			return state;
	}
}