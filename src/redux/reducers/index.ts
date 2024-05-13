import { combineReducers } from "redux";
import operationReducer from "./operation.reducer";
import userReducer from './user.reducer';
import tauxReducer from "./taux.reducer";


export default combineReducers({
    operationReducer,
    userReducer,
    tauxReducer,
})