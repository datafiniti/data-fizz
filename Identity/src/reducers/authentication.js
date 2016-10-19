import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  CHANGE_AUTH,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true};
    case DEAUTH_USER:
      return { ...state, authenticated: false};
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CHANGE_AUTH:
      return action.payload;
  }
  return state;
}
