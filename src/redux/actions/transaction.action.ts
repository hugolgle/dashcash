import { Dispatch } from 'redux';
import axios from 'axios';

export const GET_OPERATIONS = "GET_OPERATIONS";
export const ADD_OPERATIONS = "ADD_OPERATIONS";
export const EDIT_OPERATIONS = "EDIT_OPERATIONS";
export const DELETE_OPERATIONS = "DELETE_OPERATIONS";

interface getTransactionsAction {
    type: typeof GET_OPERATIONS;
    payload: any[];
}

interface AddOperationsAction {
    type: typeof ADD_OPERATIONS;
    payload: any;
}

interface editTransactionsAction {
    type: typeof EDIT_OPERATIONS;
    payload: any;
}

interface deleteTransactionsAction {
    type: typeof DELETE_OPERATIONS;
    payload: any;
}

export const getTransactions = () => {
    return (dispatch: Dispatch<getTransactionsAction>) => {
        return axios.get("http://localhost:5001/transactions").then((res) => {
            dispatch({ type: GET_OPERATIONS, payload: res.data });
        });
    };
};

export const addOperations = (data: any) => {
    return (dispatch: Dispatch<AddOperationsAction>) => {
        return axios.post("http://localhost:5001/transactions", data)
            .then((response) => {
                dispatch({ type: ADD_OPERATIONS, payload: response.data });
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
};

export const editTransactions = (data: any) => {
    return (dispatch: Dispatch<editTransactionsAction>) => {
        return axios.put(`http://localhost:5001/transactions/${data.id}`, data).then(() => {
            dispatch({ type: EDIT_OPERATIONS, payload: data });
        });
    };
};

export const deleteTransactions = (id: any) => {
    return (dispatch: Dispatch<deleteTransactionsAction>) => {
        return axios.delete(`http://localhost:5001/transactions/${id}`).then(() => {
            dispatch({ type: DELETE_OPERATIONS, payload: id });
        });
    };
};
