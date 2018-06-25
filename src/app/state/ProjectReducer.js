import * as ActionTypes from './action-types';

const INITIAL_STATE = {
    projectList: [],
    projectTeam:[],
    projectDetails: []
}

export default function ProjectReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.INIT_PROJECTLIST:
            return Object.assign({}, state, {projectList: action.payload.projectList});
        case ActionTypes.INIT_PROJECTTEAM:
            return Object.assign({}, state, {projectTeam: action.payload.projectTeam});
        case ActionTypes.INIT_PROJECTDETAILS:
            return Object.assign({}, state, {projectDetails: action.payload.projectDetails});
        default:
            return state;
    }
}