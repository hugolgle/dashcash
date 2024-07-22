import { GET_SUBSCRIPTIONS, ADD_SUBSCRIPTIONS, EDIT_SUBSCRIPTIONS, DELETE_SUBSCRIPTIONS } from "../actions/subscription.action";

const initialState: any = [];

export default function subscriptionReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_SUBSCRIPTIONS:
            return action.payload;
        case ADD_SUBSCRIPTIONS:
            return [action.payload, ...state];
        case EDIT_SUBSCRIPTIONS:
            return state.map((subscription: any) => {
                if (subscription.id === action.payload.id) {
                    return {
                        ...subscription,
                        content: action.payload.content,
                    };
                } else return subscription;
            });
        case DELETE_SUBSCRIPTIONS:
            return state.filter((subscription: any) => subscription.id !== action.payload);
        default:
            return state;
    }
}
