import { SET_ERROR, REMOVE_ERROR } from '../actions/types';

const initialState = {
    errorType : '',
    errorMsg : '',
    errorStatus : false,
}

function errorHandler(state=initialState,actions){
    const { type, payload } = actions;

    switch (type) {
        
        case SET_ERROR:
            return payload
        case REMOVE_ERROR:
            return {
                errorType : '',
                errorMsg : '',
                errorStatus : false,
            }
        default:
            return state;
    }
}

export default errorHandler;