import * as ActionTypes from "./ActionTypes";

const INITIAL_STATE = {
    isAuthenticated: false
}

export default function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true
            };
        case ActionTypes.LOGGED_OUT:
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
}