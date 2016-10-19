import axios from 'axios';
import {
  SIGN_UP,
  SIGN_IN,
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  SAVE_COMMENT,
  CHANGE_AUTH,
  FETCH_USERS,
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
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT to local storage
        localStorage.setItem('token', response.data.token);
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
      .then(res => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT to local storage
        localStorage.setItem('token', res.data.token);
        // - Redirect to the protected route /feature
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Email or password is incorrect.'));
      });
  }
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
    payload: {},
  };
}

export function signoutUser() {
  localStorage.removeItem('token'); // remove JWT from local storage
  return {
    type: DEAUTH_USER
  };
}

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment,
  };
}

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn,
  };
}

export function fetchUsers() {
  const request = axios.get('http://jsonplaceholder.typicode.com/users');
  return {
    type: FETCH_USERS,
    payload: request,
  };
}
