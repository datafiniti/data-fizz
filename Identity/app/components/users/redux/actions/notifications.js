import axios from 'axios';


export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE';

const currentUser = JSON.parse(window.localStorage.getItem('user'));

export function loadNotifications() {
    return {
        type: LOAD_NOTIFICATIONS,
    };
}

export function loadNotificationsSuccess(data) {
    return {
        type: LOAD_NOTIFICATIONS_SUCCESS,
        payload: data,
    };
}

export function loadNotificationsFailure(error) {
    return {
        type: LOAD_NOTIFICATIONS_FAILURE,
        payload: error,
    };
}

export const getNotifications = () => dispatch => {
    dispatch(loadNotifications);
    return axios.post(`/users/notifications/${currentUser._id}`)
    .then((response) => {
        if (response.data.success) {
            dispatch(loadNotificationsSuccess(response.data.res.notifications));
        } else {
            dispatch(loadNotificationsFailure(response.data.res.message));
        }
    });
};