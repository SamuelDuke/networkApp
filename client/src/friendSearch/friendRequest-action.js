// import axios from 'axios';
import {FRIEND_REQUEST, performRequest} from '../actions/constants';

export function friendRequest(values, currentState) {
    performRequest('post', '/friends', values, true);
    delete currentState[values.friendID];
    return {
        type: FRIEND_REQUEST,
        payload: currentState
    }
}
