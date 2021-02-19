import { combineReducers } from 'redux';
import auth from './auth';
import table from './table';
import errorHandler from './errorHandler';
import orderPlaced from './orderPlaced';
import previousOrders from "./PreviousOrders";
import loading from './loading';
export default combineReducers({
    auth,
    table,
    errorHandler,
    orderPlaced,
    previousOrders,
    loading
});