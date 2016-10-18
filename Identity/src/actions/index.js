import axios from 'axios';
import {
  SAVE_COMMENT,
  CHANGE_AUTH,
  FETCH_USERS,
} from './types';

export function signinUser({ email, password }) {
  return function (dispatch) {
    // Submit email/password to server
    
    // If request is good...
    // - Update state to indicate user is authenticated
    // - Save the JWT
    // - Redirect to the route /feature

    // If request is bad...
    // - Show an error to the user

  }
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
  }
}

export function fetchUsers() {
  const request = axios.get('http://jsonplaceholder.typicode.com/users');
  return {
    type: FETCH_USERS,
    payload: request,
  }
}
