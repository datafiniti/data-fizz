import axios from 'axios';
import {
  SIGN_UP,
  SIGN_IN,
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  SAVE_COMMENT,
  FETCH_DATA,
  RECEIVE_DATA,
} from './types';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3080';

export function signupUser({ email, password }) {
  return function (dispatch) {
    // Making use of redux thunk to return a function (allowing access to dispatch)
    // i.e., allowing for asynchronous decision making/requests and then dispatching an action
    // Submit email/password to server
    return axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        // If request is good...
        // - Save the JWT to local storage
        localStorage.setItem('token', response.data.token);
        // - Update state to indicate user is authenticated
        dispatch(authUser(response.data.token));
        // - Redirect to the protected route /feature
        browserHistory.push('/feature');
      })
      .catch(({response}) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError(response.data.error));
      });
  }
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
      .catch(({response}) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError(response.data.error));
      });
  }
}

export function signoutUser(userId) {
  // localStorage.removeItem('token'); // remove JWT from local storage
  // return {
  //   type: DEAUTH_USER
  // };
  return function (dispatch) {
    // Making use of redux thunk to return a function (allowing access to dispatch)
    // i.e., allowing for asynchronous decision making/requests and then dispatching an action
    // Submit email/password to server
    return axios.post(`${ROOT_URL}/signout`, { userId })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is de-authenticated
        dispatch(deauthUser(localStorage.getItem('token'))); // get JWT and call action dispatch deauthUser action creator
        localStorage.removeItem('token'); // remove JWT from local storage
      })
      .catch(({response}) => {
        // If request is bad...
        dispatch(authError(response.data.error));
      });
  }
}

export function authUser(token) {
  function getPayloadFrom(token) {
    return JSON.parse(window.atob(token.match(/([^.]+)/g)[1]));
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


export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment,
  };
}

export function fetchData() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_DATA,
          payload: response.data.message,
        });
      })
      .catch(({response}) => {
        // If authorization header not included for some weird reason...
        dispatch(authError(response.data.error));
      });
  }
}
