import { Dispatch } from 'redux';
import axios from 'axios';

// Définition des types d'actions
export const GET_OPERATIONS = "GET_OPERATIONS";
export const ADD_OPERATIONS = "ADD_OPERATIONS";
export const EDIT_OPERATIONS = "EDIT_OPERATIONS";
export const DELETE_OPERATIONS = "DELETE_OPERATIONS";

// Type d'action pour récupérer les opérations
interface GetOperationsAction {
    type: typeof GET_OPERATIONS;
    payload: any[]; // ajustez le type en fonction de vos données
}

// Type d'action pour ajouter une opération
interface AddOperationsAction {
    type: typeof ADD_OPERATIONS;
    payload: any; // ajustez le type en fonction de vos données
}

// Type d'action pour modifier une opération
interface EditOperationsAction {
    type: typeof EDIT_OPERATIONS;
    payload: any; // ajustez le type en fonction de vos données
}

// Type d'action pour supprimer une opération
interface DeleteOperationsAction {
    type: typeof DELETE_OPERATIONS;
    payload: any; // ajustez le type en fonction de vos données
}

// Action pour récupérer les opérations
export const getOperations = () => {
    return (dispatch: Dispatch<GetOperationsAction>) => {
        return axios.get("http://localhost:5001/operation").then((res) => {
            dispatch({ type: GET_OPERATIONS, payload: res.data });
        });
    };
};

// Action pour ajouter une opération
export const addOperations = (data: any) => {
    return (dispatch: Dispatch<AddOperationsAction>) => {
        return axios.post("http://localhost:5001/operation", data)
            .then((response) => {
                // Dispatch de l'action avec la réponse du serveur (qui contient l'ID de l'opération)
                dispatch({ type: ADD_OPERATIONS, payload: response.data });
                // Retourner la réponse pour la récupération de l'ID par le code appelant
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
};

// Action pour modifier une opération
export const editOperations = (data: any) => {
    return (dispatch: Dispatch<EditOperationsAction>) => {
        return axios.put(`http://localhost:5001/operation/${data.id}`, data).then(() => {
            dispatch({ type: EDIT_OPERATIONS, payload: data });
        });
    };
};

// Action pour supprimer une opération
export const deleteOperations = (id: any) => {
    return (dispatch: Dispatch<DeleteOperationsAction>) => {
        return axios.delete(`http://localhost:5001/operation/${id}`).then(() => {
            dispatch({ type: DELETE_OPERATIONS, payload: id });
        });
    };
};
