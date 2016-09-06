'use strict'

import assign from 'lodash.assign';

const initialState = {
  id: null,
  user: null,
  error: null,
  isFetching: false
}

export let session = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        error: undefined
      })
    case 'AUTH_LOGIN_SUCCESS':
      return Object.assign({}, state, {
        id: action.id,
        user: action.user,
        isFetching: false
      })
    case 'AUTH_LOGIN_FAILURE':
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      })
    case 'AUTH_LOGOUT':
      return Object.assign({}, state, {
        id: null,
        user: null
      })
    case 'CLEAR_LOGIN':
      return {
        error: undefined
      }
    default:
      return state;
  }
}


export let toUpdate = (state='', action) => {
  switch (action.type) {
    case 'SET_INFO_TO_UPDATE':
      return action.selected;
    case 'CLEAR_TO_UPDATE':
      return '';
    default:
      return state;
  }
}

const initialInfo = {
  isFetching: false,
  error: null
}

export const updateInfo = (state = initialInfo, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL_REQUEST':
      return {
        isFetching: true,
        error: undefined
      }
    case 'CHANGE_PASSWORD_REQUEST':
      return {
        isFetching: true,
        error: undefined
      }
    case 'CHANGE_EMAIL_SUCCESS':
      return {
        isFetching: false
      }
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        isFetching: false
      }
    case 'CHANGE_UPDATE_FAILURE':
      return {
        isFetching: false,
        error: action.error
      }
    default:
      return initialInfo
  }
}

const initialCheckSessions ={
  isFetching: false,
  error: null
}

export const checkSessions = (state = initialCheckSessions, action) => {
  switch (action.type) {
    case 'SESSIONS_REQUEST':
      return {
        isFetching: true,
        error: undefined
      }
    case 'SESSIONS_SUCCESS':
      return {
        isFetching: false
      }
    case 'SESSIONS_FAILURE':
      return {
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

const initialReset = {
  isFetching: false,
  error: null,
  success: false
}

export const resetPassword = (state = initialReset, action ) => {
  switch (action.type) {
    case 'RESET_AUTH_REQUEST':
      return {
        isFetching: true,
        error: undefined
      }
    case 'RESET_AUTH_SUCCESS':
      return {
        isFetching: false
      }
    case 'RESET_AUTH_FAILURE':
      return {
        isFetching: false,
        error: action.error
      }
    case 'CHECK_AUTH_REQUEST':
      return {
        isFetching: true,
        error: undefined
      }
    case 'CHECK_AUTH_SUCCESS':
      return {
        isFetching: false,
        success: true
      }
    case 'CHECK_AUTH_FAILURE':
      return {
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}