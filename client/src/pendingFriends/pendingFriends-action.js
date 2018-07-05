import axios from 'axios';
import {FETCH_PENDING_FRIENDS, API_URL} from '../actions/constants';

export function fetchPendingFriends() {
    axios.defaults.headers.common['Authorization'] = localStorage.auth_token;
    // ToDo add Search
    const request = axios.get(`${API_URL}/friends/friendRequests`);
    return {
        type: FETCH_PENDING_FRIENDS,
        payload: request
    }
}