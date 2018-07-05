import { FETCH_USERS, ActionOutcomes } from "../actions/constants";
import _ from 'lodash';


export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USERS + ActionOutcomes.pending:
            return {...state};

        case FETCH_USERS + ActionOutcomes.rejected:
            return {...state};

        case FETCH_USERS + ActionOutcomes.fulfilled:
            console.log('action.payload.data');
            console.log(action.payload);
            const users = _.keyBy(action.payload.data, 'id');
            return users;


        default:
            return {...state};
    }
}