import { GET_TRANSACTIONS, ADD_TRANSACTIONS, EDIT_TRANSACTIONS, DELETE_TRANSACTIONS } from "../actions/transaction.action";

const initialState: any = [];

export default function transactionReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return action.payload;
        case ADD_TRANSACTIONS:
            return [action.payload, ...state];
        case EDIT_TRANSACTIONS:
            return state.map((transaction: any) => {
                if (transaction.id === action.payload.id) {
                    return {
                        ...transaction,
                        content: action.payload.content,
                    };
                } else return transaction;
            });
        case DELETE_TRANSACTIONS:
            return state.filter((transaction: any) => transaction.id !== action.payload);
        default:
            return state;
    }
}
