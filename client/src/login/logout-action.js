
import { LOGIN_LOGOUT } from '../actions/constants';

export function logoutUser() {
    localStorage.removeItem('auth_token');

    const nullUser = {
        firstName: null,
        lastName: null,
        email: null,
        id: null
    };

    return {
        type: LOGIN_LOGOUT,
        payload: nullUser
    }
}