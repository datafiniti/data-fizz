import * as types from '../actions/notifications';

const INTIIAL_STATE = {
    notifications: [],
    error: null,
    loading: false,
    status: null,
};

export default function notificationsReducer(state = INTIIAL_STATE, action) {
    switch (action.type) {
        case types.LOAD_NOTIFICATIONS:
            return {
                ...state,
                loading: true,
                error: null,
                status: null,
            };

        case types.LOAD_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                status: null,
                notifications: action.payload,
            };

        case types.LOAD_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: null,
                notifications: [],
            };

        default:
            return state;
    }
}

