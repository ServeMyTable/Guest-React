import { 
    SET_RESTAURANT_PARCEL, 
    FAIL_PARCEL, 
    SET_CUSTOMER_PARCEL,
    SET_ORDER_PARCEL
 } from '../actions/types';

const initialState = {
    RestaurantDetails : null,
    CustomerDetails : null,
    OrderDetails : null
};

function parcel (state = initialState, action) {

    const { type , payload } = action;

    switch(type){

        case SET_CUSTOMER_PARCEL:
            return {
                ...state, CustomerDetails : payload
            };
            
        case SET_RESTAURANT_PARCEL:
            return {
                ...state, RestaurantDetails : payload
            };

        case SET_ORDER_PARCEL:
            return {
                ...state, OrderDetails : payload
            };

        case FAIL_PARCEL:
        default:
            return state;
    }
}

export default parcel;