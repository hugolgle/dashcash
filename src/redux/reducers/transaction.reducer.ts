import { GET_OPERATIONS, ADD_OPERATIONS, EDIT_OPERATIONS, DELETE_OPERATIONS } from "../actions/transaction.action";

const initialState: any = [];

export default function transactionReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_OPERATIONS:
            return action.payload;
        case ADD_OPERATIONS:
            return [action.payload, ...state];
        case EDIT_OPERATIONS:
            return state.map((transaction: any) => {
                if (transaction.id === action.payload.id) {
                    return {
                        ...transaction,
                        content: action.payload.content,
                    };
                } else return transaction;
            });
        case DELETE_OPERATIONS:
            return state.filter((transaction: any) => transaction.id !== action.payload);
        default:
            return state;
    }
}
