import * as ActionTypes from './action-types';

const INITIAL_STATE = {
    projectDetails: [],
}

export default function ProjectDetailsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.INIT_PROJECTDETAILS:
            return Object.assign({}, state, {projectDetails: action.payload.projectDetails});
        case ActionTypes.INIT_EDITEDPROJECTDETAILS:
            return Object.assign({}, state, {projectDetails: action.payload.updatedEmployeeDetails});
        default:
            return state;
    }
}