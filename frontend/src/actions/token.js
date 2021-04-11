import { ADD_TOKEN } from './types';
import axios from 'axios';
import { setAlert } from './errorHandler';

export const createToken = ({Phone,CustomerName,NoOfPersons}) => async dispatch =>{

    try {
        const body = JSON.stringify({Phone,CustomerName,NoOfPersons});
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }
        const response = await axios.post('/api/token',body,config);
        if(response.data === 'User does not exists'){
            dispatch(setAlert('error','Invalid Restaurant Phone No',true));
        }else{
            if(response.data !== null || response.data !== undefined){
                dispatch({
                    type : ADD_TOKEN, 
                    payload : {
                        tokenNo :response.data.tokenNo,
                        Status : 'Booked',
                        Restaurant : response.data.Restaurant,
                        TokenDetails : response.data.TokenDetails
                    }
                });
            }else{
                dispatch(setAlert('error','Unable to create token.',true));
            }
        }
    
    } catch (error) {
        console.log(error);
    }
};