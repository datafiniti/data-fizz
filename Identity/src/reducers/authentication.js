import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  FETCH_USER,
} from '../actions/types';

const initState = {
  userId: null,
  user: {},
}

export default function(state = initState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        userId: action.payload._id,
        authenticated: true,
      };
    case DEAUTH_USER:
      return {
        ...state,
        userId: null,
        user: {},
        authenticated: false,
      };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };
    case FETCH_USER:
      return { ...state, user: action.payload };
  }
  return state;
}
