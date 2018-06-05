import * as ActionTypes from './action-types';

const INITIAL_STATE = {
    projectList: [],
    status: false,
    error: undefined
}

export default function ProjectReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.INIT_PROJECTLIST:
            return Object.assign({}, state, {projectList: action.payload.projectList});
        case ActionTypes.LOADING:
            return Object.assign({}, state, {status: action.payload.status});
        case ActionTypes.ERROR:
            return Object.assign({}, state, {error: action.payload.error});

        default:
            return state;
    }
}