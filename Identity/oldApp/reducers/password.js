import * as types from '../actions/password';

const INITIAL_STATE = {
	status: null,
	error: null,
	loading: false,
};

export default function (state = INITIAL_STATE, action) {
	let error;

	switch (action.type) {
		case types.CHANGE_PASSWORD:
			return {
				...state,
				loading: true,
				status: 'is-changing',
				error: null,
			};

		case types.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				status: 'did-change',
				error: null,
			};

		case types.CHANGE_PASSWORD_FAILURE:
			return {
				...state,
				loading: false,
				status: 'bad-change',
				error: error,
			};

		default:
			return state;
	}
}