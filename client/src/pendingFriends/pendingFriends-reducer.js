import _ from 'lodash';
import { FETCH_PENDING_FRIENDS, PENDING_ACCEPT, ActionOutcomes } from "../actions/constants";

export default (state = [], action) => {
    switch (action.type) {

        case FETCH_PENDING_FRIENDS + ActionOutcomes.pending:
            return {...state};

        case FETCH_PENDING_FRIENDS + ActionOutcomes.rejected:
            return {...state};

        case FETCH_PENDING_FRIENDS + ActionOutcomes.fulfilled:
            const pendingFriends = _.keyBy(action.payload.data, 'id');
            return pendingFriends;

        case PENDING_ACCEPT + ActionOutcomes.pending:
            return {...state};

        case PENDING_ACCEPT + ActionOutcomes.rejected:
            return {...state};

        case PENDING_ACCEPT + ActionOutcomes.fulfilled:
            return action.payload;

        default:
            return {...state};
    }
}