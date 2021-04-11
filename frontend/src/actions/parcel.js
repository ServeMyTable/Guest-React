import { 
    SET_RESTAURANT_PARCEL, 
    FAIL_PARCEL, 
    SET_CUSTOMER_PARCEL,
    SET_ORDER_PARCEL
} from './types';
import axios from 'axios';
import { setAlert } from './errorHandler';
import { removeLoading } from './loading';
import { setPlaced } from './orderPlaced';

export const placeOrder = (
    {
        Dish,
        CustomerName,
        TableNo,
        TotalBill,
        notes,
        id,
        SubTotal,
        PaymentMode,
        CustomerAddress,
        OrderType,
        CustomerPhone
    }) => async dispatch =>{
    try {
        const config = {
            headers : {
                'Content-Type':'application/json',
            }
        }
        const body = JSON.stringify({
            Dish,
            CustomerName,
            TableNo,
            TotalBill,
            notes,
            id,
            SubTotal,
            PaymentMode,
            CustomerAddress,
            OrderType,
            CustomerPhone
        });
        const res = await axios.post('/api/parcel/placeOrder',body,config);
        dispatch(removeLoading());
        dispatch(setAlert("success","Order Placed Successfully",true));
        dispatch({
            type : SET_ORDER_PARCEL,
            payload : res.data
        })

        dispatch(setPlaced(true));
        

    } catch (error) {
        dispatch(removeLoading());
        dispatch(setAlert("error","Unable to Place Order",true));
        dispatch({ type : FAIL_PARCEL });
    }

};

export const setCustomerDetails = ({Details}) => async dispatch =>{
    try {
        dispatch({
            type : SET_CUSTOMER_PARCEL,
            payload : Details
        });
    }catch(error){
        dispatch({ type : FAIL_PARCEL });
    }
};

export const setRestaurantDetails = ({Phone}) => async dispatch =>{
    try {
        
        const body = JSON.stringify({Phone});
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        const response = await axios.post('/api/parcel/restaurant',body,config);
        dispatch({
            type: SET_RESTAURANT_PARCEL,
            payload : response.data
        });

    } catch (error) {
        dispatch({ type : FAIL_PARCEL });
    }
};

