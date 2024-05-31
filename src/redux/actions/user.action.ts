import axios from "axios";
import { Dispatch } from "redux";


export const loginUser = (username: any, password: any) => {
    return async (dispatch: any) => {
        try {
            const response = await fetch('http://localhost:5001/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de réseau. Veuillez réessayer.');
            }

            const usersData = await response.json();

            const user = usersData.find((u: any) => u.username === username && u.password === password);

            if (user) {
                const { _id, username, nom, prenom, pseudo, createdAt } = user;
                dispatch({ type: 'LOGIN_SUCCESS', payload: { id: _id, username, nom, prenom, pseudo, date: createdAt } });
            } else {
                dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Nom d\'utilisateur ou mot de passe incorrect' } });
            }
        } catch (error: any) {
            dispatch({ type: 'LOGIN_FAILURE', payload: { error: error.message } });
        }
    };
};

export const logoutUser = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: 'LOGOUT' });
    };
};

export const addUser = (data: any) => {
    return async () => {
        try {
            await axios.post("http://localhost:5001/user/add", data);
        } catch (error) {
            throw error;
        }
    };
};

export const editUser = (data: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5001/user/edit/${data._id}`, data);
            const updatedUserData = response.data;
            const { _id, username, password, nom, prenom, pseudo, createdAt } = updatedUserData;
            dispatch({ type: 'EDIT_USER', payload: { _id: _id, username, password, prenom, nom, pseudo, date: createdAt } });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteUser = (id: any) => {
    return (dispatch: Dispatch) => {
        return axios.delete(`http://localhost:5001/user/delete/${id}`).then(() => {
            dispatch({ type: 'DELETE_USER', payload: id })
        })
    };
};