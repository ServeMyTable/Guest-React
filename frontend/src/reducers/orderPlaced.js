import { ORDER_PLACED } from '../actions/types';

const initialState = false;

function orderPlaced(state=initialState,actions){
    
    const { type,payload } = actions;

    switch (type) {
        case ORDER_PLACED:
            return payload;
        default:
            return false;
    }
}

export default orderPlaced;