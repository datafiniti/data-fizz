import * as types from './actions';

const INITIAL_STATE = {
    createProductOpen: false,
    editProductOpen: false,
    loading: false,
    products: [],
    error: null,
};

export default function productReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.OPEN_ADD_PRODUCT:
            return {
                ...state,
                createProductOpen: true,
            };

        case types.CLOSE_ADD_PRODUCT:
            return {
                ...state,
                createProductOpen: false,
            };

        case types.OPEN_EDIT_PRODUCT:
            return {
                ...state,
                editProductOpen: true,
            };

        case types.CLOSE_EDIT_PRODUCT:
            return {
                ...state,
                editProductOpen: false,
            };

        default:
            return state;
    }
}
