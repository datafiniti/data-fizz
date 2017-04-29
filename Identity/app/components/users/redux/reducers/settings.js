import * as types from '../actions/settings';

const INITIAL_STATE = {
    loading: false,
    error: null,
    settings: [],
    status: null,
};

export default function settingsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOAD_SETTINGS:
            return {
                ...state,
                loading: true,
                error: null,
                settings: [],
                status: null,
            };

        case types.LOAD_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                settings: action.payload,
                status: null,
            };

        case types.LOAD_SETTINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                settings: [],
                status: null,
            };

        default:
            return state;
    }
}