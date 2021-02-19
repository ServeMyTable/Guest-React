import axios from 'axios';
import { setAlert } from './errorHandler';
import { removeLoading } from './loading';
import { saveOrder } from './PreviousOrders';
import {
    PLACE_ORDER_FAIL, 
    PLACE_ORDER_SUCCESS, 
    ORDER_PLACED,
    ORDERS_LOADED,
    ORDERS_LOADED_FAILED,
} from './types';

export const placeOrder = ({Dish,CustomerName,TableNo,TotalBill,notes,id,SubTotal,PaymentMode}) => async dispatch =>{

    try {
        const token = localStorage.getItem('token');
        const config = {
            headers : {
                'Content-Type':'application/json',
                'x-auth-token':token
            }
        }
        const body = JSON.stringify({Dish,CustomerName,TableNo,TotalBill,notes,id,SubTotal,PaymentMode});
        const res = await axios.post('/api/table/',body,config);
        dispatch({
            type : PLACE_ORDER_SUCCESS,
            payload : res.data
        });
        
        dispatch(saveOrder({order:res.data}));

        dispatch({
            type : ORDER_PLACED,
            payload : true
        });
        dispatch(removeLoading());
        dispatch(setAlert("success","Order Placed Successfully",true));

    } catch (error) {
        dispatch({
            type : PLACE_ORDER_FAIL
        });
        dispatch(removeLoading());
        dispatch(setAlert("error","Unable to Place Order",true));
    }
};

export const getOrders = () => async dispatch =>{
    try {
        
        const res = await axios.get('/api/table/');
        dispatch({
            type : ORDERS_LOADED,
            payload : res.data
        });

    } catch (error) {
        dispatch({
            type : ORDERS_LOADED_FAILED
        });
    }
};