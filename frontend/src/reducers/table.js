import { 
    PLACE_ORDER_SUCCESS, 
    PLACE_ORDER_FAIL,
    ORDERS_LOADED,
    ORDERS_LOADED_FAILED,
} from '../actions/types';

const initialState = [];

function table(state=initialState,action){

    const {payload,type} = action;

    switch (type) {

        case ORDERS_LOADED:
            return payload;
            
        case PLACE_ORDER_SUCCESS:
            return [...state,payload];

        case ORDERS_LOADED_FAILED:
        case PLACE_ORDER_FAIL:
        default:
            return state;
    }

}

export default table;