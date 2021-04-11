import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT
} from './types';

import setAuthToken from '../utils/setAuthToken';
import { removeLoading } from './loading';
import { setAlert } from './errorHandler';

//Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        const data = res.data;
        dispatch({
            type : USER_LOADED,
            payload : data
        });

    } catch (err) {
        dispatch({
            type : AUTH_ERROR
        });
    }
}

//login User
export const login = ({id,table,CustomerName}) => async dispatch => {

    try {
        
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({id,table,CustomerName});
        const res = await axios.post('/api/restaurant',body,config);
        if(res.data.status === 500){
            
            dispatch(setAlert("error","Please Check Details and Try Again",true));

        }else{
            dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data
            });
        }
        dispatch(removeLoading());

    } catch (error) {
        dispatch({
            type : LOGIN_FAIL
        });
        dispatch(removeLoading());
    }

}


//Logout User
export const logout = () => dispatch => {
    dispatch({
        type : LOGOUT
    });
};
