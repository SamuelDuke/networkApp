import axios from 'axios';
import {REGISTER_REGISTER, AUTH_URL} from '../actions/constants';

export function registerUser(values) {
    const response = axios.post(`${AUTH_URL}/register`, values)
        .then(response => {
            return '';
        })
        .catch(error => {
            return error.response.data.userMessage
        });

    return {
        type: REGISTER_REGISTER,
        payload: response
    }
}
