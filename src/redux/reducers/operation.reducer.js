import { GET_OPERATIONS, ADD_OPERATIONS, EDIT_OPERATIONS, DELETE_OPERATIONS } from "../actions/operation.action";

const initialState = [];

export default function operationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_OPERATIONS:
            return action.payload;
        case ADD_OPERATIONS:
            return [action.payload, ...state]; // Ajoutez la nouvelle opération en premier dans le tableau
        case EDIT_OPERATIONS:
            return state.map((operation) => {
                if (operation.id === action.payload.id) {
                    return {
                        ...operation,
                        content: action.payload.content,
                    };
                } else return operation;
            });
        case DELETE_OPERATIONS:
            return state.filter((operation) => operation.id !== action.payload);
        default:
            return state;
    }
}
