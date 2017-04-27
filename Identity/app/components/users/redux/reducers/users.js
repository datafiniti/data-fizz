import * as types from '../actions/users';

const INTIIAL_STATE = {
    changePasswordOpen: false,
    editUserOpen: false,
    loading: false,
    error: null,
    status: null,
};

export default function userReducer(state = INTIIAL_STATE, action) {
    switch (action.type) {
        case types.OPEN_CHANGE_PASSWORD:
            return {
                ...state,
                changePasswordOpen: true,
            };

        case types.CLOSE_CHANGE_PASSWORD:
            return {
                ...state,
                changePasswordOpen: false,
            };

        case types.OPEN_EDIT_USER:
            return {
                ...state,
                editUserOpen: true,
            };

        case types.CLOSE_EDIT_USER:
            return {
                ...state,
                editUserOpen: false,
            };

        case types.CHANGE_PASSWORD:
            return {
                ...state,
                changePasswordOpen: true,
                loading: true,
            };

        case types.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                status: 'change-password-success',
            };

        case types.EDIT_USER:
            return {
                ...state,
                editUserOpen: true,
                loading: true,
            };

        case types.EDIT_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case types.EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: 'edit-user-success',
            };

        default:
            return state;
    }
}

