import axios from 'axios';
import { browserHistory } from 'react-router';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'auth_error';

const ROOT_URL = 'http://localhost:3090';

export function login({ email, password }) {
    
    return function(dispatch){
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/login`,{ email, password }) //should see the Token in Network => Preview
        .then( response => {
            dispatch({ type: AUTH_USER })
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('id',response.data.id)
            browserHistory.push('/dashboard');
        })
        .catch(() => {
            dispatch(authError('Bad Login Info'))
        })
    }
}
export function signupUser({name,password,email}) {
    
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`,{ 
            password,
            email,
            name
            }) 
            .then( response => {
                dispatch({ type: AUTH_USER})
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('id',response.data.id)
                browserHistory.push('/dashboard');
            })
            .catch(() => {
                dispatch(authError(response.data.error))
            })
    }
}
export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
export function signoutUser(){
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    return function (dispatch){
        axios.post(`${ROOT_URL}/logout`,{ id, token })
        .then( (response) => {
            dispatch({type: UNAUTH_USER})
        })
        .catch(() => {
          dispatch(authError('Bad Email Info'))
        })
    }
}


export function resetPwd({email}){
  return function(dispatch){
    axios.put(`${ROOT_URL}/resetPwd`,{ email })
        .then( () => {})
        .catch(() => {
          dispatch(authError('Bad Email Info'))
        })
    }

}

export function changePwd({password}){
  const id = localStorage.getItem('id');
  return axios.put(`${ROOT_URL}/changePwd`,{ id, password })
}




