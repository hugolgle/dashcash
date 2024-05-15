import { Dispatch } from 'redux';
import axios from 'axios';

export const GET_OPERATIONS = "GET_OPERATIONS";
export const ADD_OPERATIONS = "ADD_OPERATIONS";
export const EDIT_OPERATIONS = "EDIT_OPERATIONS";
export const DELETE_OPERATIONS = "DELETE_OPERATIONS";

interface GetOperationsAction {
    type: typeof GET_OPERATIONS;
    payload: any[];
}

interface AddOperationsAction {
    type: typeof ADD_OPERATIONS;
    payload: any;
}

interface EditOperationsAction {
    type: typeof EDIT_OPERATIONS;
    payload: any;
}

interface DeleteOperationsAction {
    type: typeof DELETE_OPERATIONS;
    payload: any;
}

export const getOperations = () => {
    return (dispatch: Dispatch<GetOperationsAction>) => {
        return axios.get("http://localhost:5001/operation").then((res) => {
            dispatch({ type: GET_OPERATIONS, payload: res.data });
        });
    };
};

export const addOperations = (data: any) => {
    return (dispatch: Dispatch<AddOperationsAction>) => {
        return axios.post("http://localhost:5001/operation", data)
            .then((response) => {
                dispatch({ type: ADD_OPERATIONS, payload: response.data });
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
};

export const editOperations = (data: any) => {
    return (dispatch: Dispatch<EditOperationsAction>) => {
        return axios.put(`http://localhost:5001/operation/${data.id}`, data).then(() => {
            dispatch({ type: EDIT_OPERATIONS, payload: data });
        });
    };
};

export const deleteOperations = (id: any) => {
    return (dispatch: Dispatch<DeleteOperationsAction>) => {
        return axios.delete(`http://localhost:5001/operation/${id}`).then(() => {
            dispatch({ type: DELETE_OPERATIONS, payload: id });
        });
    };
};
