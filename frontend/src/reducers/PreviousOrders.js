import { SAVE_ORDERS,SET_ORDERS } from '../actions/types';

const initialState = [];

function previousOrders(state=initialState,actions){
    
    const { type,payload } = actions;

    switch (type) {
        
        case SAVE_ORDERS:
            return [...state,payload];
        case SET_ORDERS:
            return payload;
        default:
            return state;
    }
}

export default previousOrders;