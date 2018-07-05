import {FETCH_USERS, FRIEND_SELECTED, API_URL} from '../actions/constants';
// import  { performRequest } from '../actions/constants';
//
// export function fetchUsers() {
//     const request = performRequest('get', '/users', '',true)
//         .then(
//             res => {
//                 console.log(res);
//             }
//         );
//     return {
//         type: FETCH_USERS,
//         payload: request
//     }
// }

import axios from 'axios';

export function fetchUsers() {
    axios.defaults.headers.common['Authorization'] = localStorage.auth_token;
    const searchTerm = 'sam';
    const request = axios.get(`${API_URL}/users?searchTerm=${searchTerm}`);
    return {
        type: FETCH_USERS,
        payload: request
    }
}

export const selectFriend = (user) => {
    console.log('This is the user that is selected.');
    console.log('ID:', user.id);
    console.log('Name:', user.firstName, user.lastName);
    return {
        type: FRIEND_SELECTED,
        payload: user
    }
};