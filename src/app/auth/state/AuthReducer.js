import * as ActionTypes from "./ActionTypes";

const INITIAL_STATE = {
    isAuthenticated: false
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.LOGGED_IN: 
            return Object.assign({}, state, {isAuthenticated: true})
        case ActionTypes.LOGGED_OUT:
            return Object.assign({}, state, {isAuthenticated: false});
        default:
            return state;
    }
}