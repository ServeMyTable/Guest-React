import { ADD_TOKEN } from '../actions/types';

const initialState = {
    tokenNo : null,
    Status : null,
    Restaurant : null,
    TokenDetails : null
};

function token(state=initialState,action)
{
    switch (action.type) {

        case ADD_TOKEN:
            return action.payload;

        default:
            return state;
    }
}

export default token;