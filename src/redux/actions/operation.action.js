import axios from "axios";

export const GET_OPERATIONS = "GET_OPERATIONS";
export const ADD_OPERATIONS = "ADD_OPERATIONS";
export const EDIT_OPERATIONS = "EDIT_OPERATIONS";
export const DELETE_OPERATIONS = "DELETE_OPERATIONS";

export const getOperations = () => {
    return (dispatch) => {
        return axios.get("http://localhost:5001/operation").then((res) => {
            dispatch({ type: GET_OPERATIONS, payload: res.data })
        })
    };
};

export const addOperations = (data) => {
    return (dispatch) => {
        return axios.post("http://localhost:5001/operation", data)
            .then(() => {
                dispatch({ type: ADD_OPERATIONS, payload: data });
            })
            .catch((error) => {
                throw error; // Rejeter l'erreur pour que vous puissiez la capturer à l'endroit où vous appelez addUser
            });
    };
};

export const editOperations = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:5001/operation/${data.id}`, data).then(() => {
            dispatch({ type: EDIT_OPERATIONS, payload: data })
        })
    };
};

export const deleteOperations = (id) => {
    return (dispatch) => {
        return axios.delete(`http://localhost:5001/operation/${id}`).then(() => {
            dispatch({ type: DELETE_OPERATIONS, payload: id })
        })
    };
};