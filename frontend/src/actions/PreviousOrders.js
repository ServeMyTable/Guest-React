import { SAVE_ORDERS, SET_ORDERS } from "./types";

export const saveOrder = ({order})=>dispatch=>{
    
    dispatch({
        type:SAVE_ORDERS,
        payload: order
    });
};

export const setOrders = ({allOrders})=>dispatch=>{

    dispatch({
        type:SET_ORDERS,
        payload:allOrders
    })
};