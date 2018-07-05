// import axios from 'axios';
import {FETCH_FRIENDS, performRequest} from '../actions/constants';

export function fetchFriends(values) {
    // console.log('Was Called');
    const request = performRequest('get', '/friends', values, true);

    return {
        type: FETCH_FRIENDS,
        payload: request
    }
}
