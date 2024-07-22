import { Dispatch } from 'redux';
import axios from 'axios';

export const GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS";
export const ADD_SUBSCRIPTIONS = "ADD_SUBSCRIPTIONS";
export const EDIT_SUBSCRIPTIONS = "EDIT_SUBSCRIPTIONS";
export const DELETE_SUBSCRIPTIONS = "DELETE_SUBSCRIPTIONS";

interface GetSubscriptionsAction {
    type: typeof GET_SUBSCRIPTIONS;
    payload: any[];
}

interface AddSubscriptionsAction {
    type: typeof ADD_SUBSCRIPTIONS;
    payload: any;
}

interface EditSubscriptionsAction {
    type: typeof EDIT_SUBSCRIPTIONS;
    payload: any;
}

interface DeleteSubscriptionsAction {
    type: typeof DELETE_SUBSCRIPTIONS;
    payload: any;
}

export const getSubscriptions = () => {
    return (dispatch: Dispatch<GetSubscriptionsAction>) => {
        return axios.get("http://localhost:5001/subscriptions").then((res) => {
            dispatch({ type: GET_SUBSCRIPTIONS, payload: res.data });
        });
    };
};

export const addSubscriptions = (data: any) => {
    return (dispatch: Dispatch<AddSubscriptionsAction>) => {
        return axios.post("http://localhost:5001/subscriptions", data)
            .then((response) => {
                dispatch({ type: ADD_SUBSCRIPTIONS, payload: response.data });
                return response;
            })
            .catch((error) => {
                throw error;
            });
    };
};

export const editSubscriptions = (data: any) => {
    return (dispatch: Dispatch<EditSubscriptionsAction>) => {
        return axios.put(`http://localhost:5001/subscriptions/${data.id}`, data).then(() => {
            dispatch({ type: EDIT_SUBSCRIPTIONS, payload: data });
        });
    };
};

export const deleteSubscriptions = (id: any) => {
    return (dispatch: Dispatch<DeleteSubscriptionsAction>) => {
        return axios.delete(`http://localhost:5001/subscriptions/${id}`).then(() => {
            dispatch({ type: DELETE_SUBSCRIPTIONS, payload: id });
        });
    };
};
