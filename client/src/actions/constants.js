import axios from 'axios'

export const AUTH_URL = 'http://localhost:8080/auth';
export const API_URL = 'http://localhost:8080/api';

export const performRequest = (method, url, params, auth) => {
    const body = method === 'get' ? 'params' : 'data';
    const config = {
        method,
        url: url,
        baseURL: AUTH_URL,
        [body]: params || {}
    };
    if (auth) {
        config.baseURL = API_URL;
        // console.log('Auth is true, config.base url = ', config.baseURL, url);
        config.headers = {
            Authorization: localStorage.auth_token
        }
    }
    // if (params && auth) {
    //     config.url = url + '/' + params;
    // }

    return axios.request(config)
};

export const ActionOutcomes = {
    pending: '_PENDING',
    fulfilled: '_FULFILLED',
    rejected: '_REJECTED'
};

export const LOGIN_LOGIN = 'LOGIN_LOGIN';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';
export const REGISTER_REGISTER = 'REGISTER_REGISTER';
export const FETCH_USERS = 'USERS_FETCH_USERS';
export const FETCH_PENDING_FRIENDS = 'FRIENDS_FETCH_PENDING_FRIENDS';
export const PENDING_ACCEPT = 'FRIENDS_PENDING_ACCEPT';
export const FETCH_FRIEND_SEARCH = 'FRIENDS_FETCH_FRIEND_SEARCH';
export const FETCH_FRIENDS = 'FRIENDS_FETCH_FRIENDS';
export const FRIEND_REQUEST = 'FRIENDS_FRIEND_REQUEST';
export const FRIEND_SELECTED = 'FIND_FRIEND_FRIEND_SELECTED';


