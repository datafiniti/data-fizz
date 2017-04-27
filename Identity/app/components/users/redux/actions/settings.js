import axios from 'axios';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export const LOAD_SETTINGS_FAILURE = 'LOAD_SETTINGS_FAILURE';

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

// thunks

export const loadSettings = () => dispatch => {
    console.log(token);
    dispatch(loadSettingsStart());
    return axios.get('/settings/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
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

