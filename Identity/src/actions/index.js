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
            //If request is good...
            // - update state to indicate user is authenticated
            dispatch({ type: AUTH_USER })
            // - Save the JWT token
            localStorage.setItem('token',response.data.token)
            // - redirect to the route '/'
            browserHistory.push('/dashboard');
        })
        .catch(() => {
            //if request is bad...
            // - Show an error to the server
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
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export function resetPwd(email){
  axios.post(`${ROOT_URL}/resetPwd`,{ email })
}

export function changePwd({password}){
  axios.post(`${ROOT_URL}/resetPwd`,{ password })
}




