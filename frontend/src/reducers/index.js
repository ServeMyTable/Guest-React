import { combineReducers } from 'redux';
import auth from './auth';
import table from './table';
import errorHandler from './errorHandler';
import orderPlaced from './orderPlaced';
import previousOrders from "./PreviousOrders";
import loading from './loading';
import token from './token';
import parcel from './parcel';
import tokenList from './tokenList';

export default combineReducers({
    auth,
    table,
    token,
    tokenList,
    errorHandler,
    orderPlaced,
    previousOrders,
    loading,
    parcel
});