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

            const usersData = await response.json();

            const user = usersData.find((u: any) => u.username === username && u.password === password);

            if (user) {
                const { _id, username, nom, prenom, pseudo, image } = user;
                dispatch({ type: 'LOGIN_SUCCESS', payload: { id: _id, username, nom, prenom, pseudo, image } });
            } else {
                dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Nom d\'utilisateur ou mot de passe incorrect' } });
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Erreur de connexion' } });
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
            const { _id, username, password, nom, prenom, pseudo } = updatedUserData;
            dispatch({ type: 'EDIT_USER', payload: { _id: _id, username, password, prenom, nom, pseudo } });
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