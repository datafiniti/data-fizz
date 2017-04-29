import axios from 'axios';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export const LOAD_SETTINGS_FAILURE = 'LOAD_SETTINGS_FAILURE';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

const token = window.localStorage.getItem('token');

export function loadSettingsStart() {
    return {
        type: LOAD_SETTINGS,
    };
}

export function loadSettingsSucess(data) {
    return {
        type: LOAD_SETTINGS_SUCCESS,
        payload: data,
    };
}

export function loadSettingsFailure(error) {
    return {
        type: LOAD_SETTINGS_FAILURE,
        payload: error,
    };
}

export function updateSettingsStart() {
    return {
        type: UPDATE_SETTINGS,
    };
}

export function updateSettingsSuccess(data) {
    return {
        type: UPDATE_SETTINGS_SUCCESS,
        payload: data,
    };
}

export function updateSettingsFailure(error) {
    return {
        type: UPDATE_SETTINGS_FAILURE,
        payload: error,
    };
}
 
// thunks

export const loadSettings = () => dispatch => {
    dispatch(loadSettingsStart());
    return axios.get('/settings/user', {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (response.data.success) {
            dispatch(loadSettingsSucess(response.data.res.setting));
        } else {
            dispatch(loadSettingsFailure(response.data.res.message));
        }
    });
};

export const updateSettings = (data) => dispatch => {
    console.log(data);
    dispatch(updateSettingsStart());
    return axios.post('/settings/user', data, {

        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (response.data.success) {
            dispatch(updateSettingsSuccess(response.data.res.item));
        } else {
            dispatch(loadSettingsFailure(response.data.res.error));
        }
    })
    .catch(error => {
        dispatch(loadSettingsFailure(error));
    });
};

