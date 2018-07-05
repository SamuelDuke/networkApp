import axios from 'axios';
import { AUTH_URL } from '../actions/constants';

export function registerUserService(values) {
    return axios.post(`${AUTH_URL}/register`, values)
        .then(response => {
            return { success: true, message: '' };
        })
        .catch(error => {
            return { success: false, message: error.response.data.userMessage }
        });
}
