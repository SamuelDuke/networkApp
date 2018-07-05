import { REGISTER_REGISTER, ActionOutcomes} from '../actions/constants';

export default (state = null, action) => {
    switch (action.type) {
        case REGISTER_REGISTER + ActionOutcomes.pending:
            return {...state};
        case REGISTER_REGISTER + ActionOutcomes.fulfilled:
            return action.payload;
        case REGISTER_REGISTER + ActionOutcomes.rejected:
            return {...state};

        default:
            return state;
    }
}