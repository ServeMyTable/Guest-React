import { ORDER_PLACED } from './types';

export const setPlaced = (status) => dispatch =>{

    dispatch({
        type : ORDER_PLACED,
        payload : status
    });
    
};