import {SET_LOADING,REMOVE_LOADING} from './types';

export const setLoading = () => dispatch =>{
    dispatch({
        type:SET_LOADING
    })
};

export const removeLoading = () => dispatch =>{
    dispatch({
        type:REMOVE_LOADING
    })
};
