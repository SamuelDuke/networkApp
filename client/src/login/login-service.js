import { LOGIN_LOGIN } from '../actions/constants';
import  { performRequest } from '../actions/constants';

export function loginUser(values) {
    const request = performRequest('post', '/login', values, false)
        .then(
            (res) => {
                localStorage.setItem('auth_token', res.data.token)
            }
        );

    return {
        type: LOGIN_LOGIN,
        payload: request
    }
}