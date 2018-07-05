// import axios from 'axios';
import { LOGIN_LOGIN } from '../actions/constants';
import  { performRequest } from '../actions/constants';

// export function loginUser(values) {
//     const request = axios.post(`${AUTH_URL}/login`, values)
//         .then(
//             (res) => {
//                 localStorage.setItem('auth_token', res.data.token)
//             }
//         );
// method, url, params, auth

export function loginUser(values) {
    const request = performRequest('post', '/login', values, false)
        .then(
            (res) => {
                console.log('res.data', res.data.token);
                localStorage.setItem('auth_token', res.data.token)
            }
        );

    return {
        type: LOGIN_LOGIN,
        payload: request
    }
}