import { SET_TOKEN_LIST } from '../actions/types';

const initialState = [];

function token(state=initialState,action)
{
    switch (action.type) {

        case SET_TOKEN_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default token;

