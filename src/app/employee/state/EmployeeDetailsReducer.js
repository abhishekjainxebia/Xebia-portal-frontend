import * as ActionTypes from '../state/action-types';

const INITIAL_STATE = {
    employeeDetails: [],

}

export default function EmployeeDetailsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ActionTypes.INIT_EMPLOYEEDETAILS:
            return Object.assign({}, state, {employeeDetails: action.payload.employeeDetails});
        case ActionTypes.INIT_EDITEDEMPLOYEEDETAILS:
            return Object.assign({}, state, {employeeDetails: action.payload.updatedEmployeeDetails});
        default:
            return state;
    }
}