import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  FETCH_DATA,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null,
        userId: action.payload._id,
      };
    case DEAUTH_USER:
      return {
        ...state,
        error: null,
        authenticated: false,
        userId: null,
      };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };
    case FETCH_DATA:
      return { ...state, message: action.payload };
  }
  return state;
}
