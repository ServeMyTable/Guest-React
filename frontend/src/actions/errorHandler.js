import { SET_ERROR, REMOVE_ERROR } from "./types";

export const setAlert = (errorType,errorMsg,errorStatus) => dispatch => {
    
    dispatch({
        type : SET_ERROR,
        payload : { errorType,errorMsg,errorStatus}
    });
 
    setTimeout(()=>{
        dispatch({
            type : REMOVE_ERROR,
            payload : {
                errorType : '',
                errorMsg : '',
                errorStatus : ''
            }
        })
    },3000);
}