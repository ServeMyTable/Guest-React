import { SET_TOKEN_LIST } from './types';
import axios from 'axios';
import { setAlert } from './errorHandler';

export const getWaitingList = ({Phone}) => async dispatch =>{
    try {
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({Phone});
        const response = await axios.post('/api/token/waiting',body,config);
        
        if(response.data === "User does not exists"){

            dispatch(setAlert('error','Invalid Restaurant Phone No.',true));

        }else
        if(response.data === []){
            
            dispatch(setAlert('error','There is no waiting',true));
            
        }else{

            dispatch({
                type : SET_TOKEN_LIST,
                payload : response.data
            });
        }

    } catch (error) {
        console.log(error);
    }
};