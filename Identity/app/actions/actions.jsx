import axios from 'axios'
import { replace } from 'react-router-redux'
import { browserHistory } from 'react-router'

export const signup = (credentials) => (dispatch) => {
  dispatch({ type: 'AUTH_LOGIN_REQUEST' })

  return axios.post('/signup', credentials)
  .then(res => res.data)
  .then(user => {
    dispatch({
      type: 'AUTH_LOGIN_SUCCESS',
      id: user.id,
      user
    })
    dispatch(replace('/bill'))
  })
  .catch(error => dispatch({ type: 'AUTH_LOGIN_FAILURE', error}))
};

export const login = (credentials) => (dispatch) => {
  dispatch({ type: 'AUTH_LOGIN_REQUEST' })

  return axios.post('/login', credentials)
  .then(res => res.data)
  .then(user => {
    if (user) {
      dispatch({
        type: 'AUTH_LOGIN_SUCCESS',
        id: user.id,
        user
      })
      dispatch(replace('/bill'))
    }
  })
  .catch(error => dispatch({ type: 'AUTH_LOGIN_FAILURE', error}))
};

export const logout = () => (dispatch) => {
  dispatch({type: 'AUTH_LOGOUT'})
  return axios.get('/logout')
  .then(()=>{
    dispatch(replace('/'));
  })
}

export const selectToUpdate = (selected) => {
  return {
    type: 'SET_INFO_TO_UPDATE',
    selected
  }
}

export const clearToUpdate = () => {
  return {
    type: "CLEAR_TO_UPDATE"
  }
}

export const changeInfo = (toChange) => (dispatch) => {
  let info = toChange.info.toUpperCase();
  dispatch({type: 'CHANGE_'+info+'_REQUEST'})
  return axios.put('/api/user/update/'+info.toLowerCase(), toChange)
  .then(res => res.data)
  .then(update => {
    if (update) {
      dispatch({type: 'CHANGE_'+info+'_SUCCESS'})
      dispatch(selectToUpdate(info+'_SUCCESS'))
    }
  })
  .catch(error => dispatch({type: 'CHANGE_UPDATE_FAILURE', error}))
}

export const checkIfSession = () => (dispatch) => {
  dispatch({type: 'SESSIONS_REQUEST'})
  return axios.get('/checkIfSession')
  .then(()=> {
    dispatch({type: 'SESSIONS_SUCCESS'})
  })
  .catch(error => dispatch({ type: 'SESSIONS_FAILURE', error}))
}

export const setResetAuth = (email) => (dispatch) => {
  dispatch({type: 'RESET_AUTH_REQUEST'})
  return axios.post('/api/reset/setcode', email)
  .then(() => {
    dispatch({type: 'RESET_AUTH_SUCCESS'})
    dispatch(replace('/reset'))
  })
  .catch(error => dispatch({ type: 'RESET_AUTH_FAILURE', error}))
}

export const checkResetAuth = (credentials) => (dispatch) => {
  dispatch({type: 'CHECK_AUTH_REQUEST'})
  return axios.put('/api/reset/checkcode', credentials)
  .then((auth) => {
    dispatch({type: 'CHECK_AUTH_SUCCESS'})
    dispatch(replace('reset-success'))
  })
  .catch(error => dispatch({ type: 'CHECK_AUTH_FAILURE', error }))
}
