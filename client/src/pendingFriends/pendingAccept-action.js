import {FRIEND_REQUEST, performRequest} from '../actions/constants';

export function pendingAccept(values, currentState) {
    performRequest('put', '/friends/accept', values, true);
    delete currentState[values.friendId];
    return {
        type: FRIEND_REQUEST,
        payload: currentState
    }
}
