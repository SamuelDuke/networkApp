import _ from 'lodash';
import { FETCH_FRIEND_SEARCH, FRIEND_REQUEST, ActionOutcomes } from "../actions/constants";

export default (state = [], action) => {
    switch (action.type) {

        case FETCH_FRIEND_SEARCH + ActionOutcomes.pending:
            return {...state};

        case FETCH_FRIEND_SEARCH + ActionOutcomes.rejected:
            return {...state};

        case FETCH_FRIEND_SEARCH + ActionOutcomes.fulfilled:
            const pendingFriends = _.keyBy(action.payload.data, 'userID');
            return pendingFriends;

        case FRIEND_REQUEST + ActionOutcomes.pending:
            return {...state};

        case FRIEND_REQUEST + ActionOutcomes.rejected:
            return {...state};

        case FRIEND_REQUEST + ActionOutcomes.fulfilled:
            // console.log('action.payload.data');
            // console.log(action.payload);
            // const pendingFriends = _.keyBy(action.payload.data, 'id');
            // console.log(pendingFriends);
            return action.payload;

        default:
            return {...state};
    }
}