import { GET_OPERATIONS, ADD_OPERATIONS, EDIT_OPERATIONS, DELETE_OPERATIONS } from "../actions/operation.action";

const initialeState = {};

export default function operationReducer(state = initialeState, action) {
    switch (action.type) {
        case GET_OPERATIONS:
            return action.payload;
        case ADD_OPERATIONS:
            return [action.payload, ...state];
        case EDIT_OPERATIONS:
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        content: action.payload.content,
                    };
                } else return post;
            })
        case DELETE_OPERATIONS:
            return state.filter((post) => post.id != action.payload);
        default:
            return state;
    }
}