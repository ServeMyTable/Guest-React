import {SET_LOADING,REMOVE_LOADING} from '../actions/types';

const initialState = false;

export default function loading(state=initialState,action){
    
    const {type} = action;

    switch (type) {

        case SET_LOADING:
            return true;

        case REMOVE_LOADING:
            return false;

        default:
            return state;
    }
}