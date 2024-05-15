import { GET_OPERATIONS, ADD_OPERATIONS, EDIT_OPERATIONS, DELETE_OPERATIONS } from "../actions/operation.action";

const initialState: any = [];

export default function operationReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_OPERATIONS:
            return action.payload;
        case ADD_OPERATIONS:
            return [action.payload, ...state];
        case EDIT_OPERATIONS:
            return state.map((operation: any) => {
                if (operation.id === action.payload.id) {
                    return {
                        ...operation,
                        content: action.payload.content,
                    };
                } else return operation;
            });
        case DELETE_OPERATIONS:
            return state.filter((operation: any) => operation.id !== action.payload);
        default:
            return state;
    }
}
