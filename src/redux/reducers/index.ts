import { combineReducers } from "redux";
import transactionReducer from "./transaction.reducer";
import userReducer from './user.reducer';
import tauxReducer from "./taux.reducer";


export default combineReducers({
    transactionReducer,
    userReducer,
    tauxReducer,
})