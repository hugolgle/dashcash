// refund.action.js

import axios from 'axios';
import { GET_TRANSACTIONS } from './transaction.action';

export const ADD_REFUND = "ADD_REFUND";
export const EDIT_REFUND = "EDIT_REFUND";
export const DELETE_REFUND = "DELETE_REFUND";

// Action pour ajouter un remboursement
export const addRefund = (transactionId: any, refundData: any) => {
    return (dispatch: any) => {
        return axios.post(`http://localhost:5001/transactions/${transactionId}/refund`, refundData)
            .then((response) => {
                dispatch({ type: ADD_REFUND, payload: { _id: transactionId, refund: response.data.remboursements.slice(-1)[0] } });
                dispatch({ type: GET_TRANSACTIONS });
                return response;
            })
            .catch((error) => {
                console.error('Error adding refund:', error);
                throw error;
            });
    };
};


// Action pour modifier un remboursement
export const editRefund = (transactionId: any, refundData: any) => {
    return async (dispatch: any) => {
        try {
            await axios.put(`http://localhost:5001/transactions/${transactionId}/refund/${refundData.id}`, refundData);
            dispatch({ type: EDIT_REFUND, payload: refundData });
            dispatch({ type: GET_TRANSACTIONS }); // Rafraîchir les transactions après la modification du remboursement
        } catch (error) {
            throw error;
        }
    };
};

// Action pour supprimer un remboursement
export const deleteRefund = (transactionId: any, refundId: any) => {
    return async (dispatch: any) => {
        try {
            await axios.delete(`http://localhost:5001/transactions/${transactionId}/refund/${refundId}`);
            dispatch({ type: DELETE_REFUND, payload: refundId });
            dispatch({ type: GET_TRANSACTIONS }); // Rafraîchir les transactions après la suppression du remboursement
        } catch (error) {
            throw error;
        }
    };
};
