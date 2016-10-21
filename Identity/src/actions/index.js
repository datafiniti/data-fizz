import axios from 'axios';
import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  FETCH_USER,
  UPDATE_USER,
  REQUEST_PASSWORD_RESET,
} from './types';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3080';

/* eslint-disable func-names */
export function signupUser(user) {
  return function (dispatch) {
    // Making use of redux thunk to return a function (allowing access to dispatch)
    // i.e., allowing for asynchronous decision making/requests and then dispatching an action
    // Submit email/password to server
    return axios.post(`${ROOT_URL}/signup`, user)
      .then(response => {
        // If request is good...
        // - Save the JWT to local storage
        localStorage.setItem('token', response.data.token);
        // - Update state to indicate user is authenticated
        dispatch(authUser(response.data.token));
        // - Redirect to the protected route /feature
        browserHistory.push('/feature');
      })
      .catch(({ response }) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError(response.data.error));
      });
  };
}

export function signinUser({ email, password }) {
  return function (dispatch) {
    // Making use of redux thunk to return a function (allowing access to dispatch)
    // i.e., allowing for asynchronous decision making/requests and then dispatching an action
    // Submit email/password to server
    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Save the JWT to local storage
        localStorage.setItem('token', response.data.token);
        // - Update state to indicate user is authenticated
        dispatch(authUser(response.data.token));
        // - Redirect to the protected route /feature
        browserHistory.push('/feature');
      })
      .catch(({ response }) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError(response.data.error));
      });
  };
}

export function signoutUser(userId) {
  return function (dispatch) {
    // Making use of redux thunk to return a function (allowing access to dispatch)
    // i.e., allowing for asynchronous decision making/requests and then dispatching an action
    // Submit email/password to server
    return axios.post(`${ROOT_URL}/signout`, { userId })
      .then(() => {
        // If request is good...
        // - Update state to indicate user is de-authenticated
        // get JWT and call action dispatch deauthUser action creator
        dispatch(deauthUser(localStorage.getItem('token')));
        localStorage.removeItem('token'); // remove JWT from local storage
      })
      .catch(({ response }) => {
        // If request is bad...
        dispatch(authError(response.data.error));
      });
  };
}

export function authUser(token) {
  function getPayloadFrom(foundToken) {
    return JSON.parse(window.atob(foundToken.match(/([^.]+)/g)[1]));
  }
  return {
    type: AUTH_USER,
    payload: getPayloadFrom(token),
  };
}

export function deauthUser(user) {
  return {
    type: DEAUTH_USER,
    payload: user,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function clearAuthError() {
  return {
    type: CLEAR_AUTH_ERROR,
    payload: '',
  };
}

export function fetchUser() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/account`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(response => {
        const user = response.data;
        const numOfActiveSessions = user.activeSessions.length;
        dispatch({
          type: FETCH_USER,
          payload: user,
        });
        if (numOfActiveSessions > 1) {
          dispatch(
            authError(
            `You're signed in on ${numOfActiveSessions - 1} other device(s).
            Change your password if you believe someone else may have signed in to your account.`
            )
          );
        }
      })
      .catch(({ response }) => {
        // If authorization header not included for some weird reason...
        dispatch(authError(response.data.error));
      });
  };
}

export function updateUser(user) {
  return function (dispatch) {
    const params = user;
    const config = {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    };
    let url = `${ROOT_URL}/account/edit`;
    if (user.password || user.newPassword) {
      url += '/password';
    }
    axios.put(url, params, config)
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
      })
      .catch(({ response }) => {
        // If authorization header not included for some weird reason...
        dispatch(authError(response.data.error));
      });
  };
}

export function requestPasswordReset(user) {
  return function (dispatch) {
    const params = { user };
    const url = `${ROOT_URL}/account/request/password/reset`;
    axios.post(url, params)
      .then(response => {
        dispatch({
          type: REQUEST_PASSWORD_RESET,
          payload: response.data,
        });
      })
      .catch(({ response }) => {
        // if there's an error with the backend -- db or nodemailer
        dispatch(authError(response.data.error));
      });
  };
}
/* eslint-enable func-names */
