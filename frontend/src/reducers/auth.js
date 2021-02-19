import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT
} from '../actions/types';


const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    user: null
};

function auth(state = initialState, action){

    const {type,payload} = action;

    switch(type) {

        case USER_LOADED:
            return{
                ...state,
                isAuthenticated : true,
                user : payload
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated : true,
            }
            
        case LOGOUT:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated : false,
                user : null
            }

        default :
            return state;
    }

}

export default auth;