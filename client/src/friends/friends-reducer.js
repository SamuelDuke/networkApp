import _ from 'lodash';
import { FETCH_FRIENDS, ActionOutcomes } from "../actions/constants";

export default (state = [], action) => {
    switch (action.type) {

        case FETCH_FRIENDS + ActionOutcomes.pending:
            return {...state};

        case FETCH_FRIENDS + ActionOutcomes.rejected:
            return {...state};

        case FETCH_FRIENDS + ActionOutcomes.fulfilled:
            // console.log('friends', friends);
            // console.log('action.payload.data', action.payload.data);
            const friends = _.keyBy(action.payload.data, 'userID');
            // console.log('FRIENDS', friends);
            return friends;

        default:
            return {...state};
    }
}