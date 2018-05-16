import * as ActionTypes from '../state/action-types';

const INITIAL_STATE = {
    employeeDetails: [],
    employeeProjectList: [],
    employeePermanentAddress: [],
    employeeCurrentAddress: []
}

export default function EmployeeDetailsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.INIT_EMPLOYEEDETAILS:
            return Object.assign({}, state, { employeeDetails: action.payload.employeeDetails });
        case ActionTypes.INIT_EMPLOYEEPROJECTLIST:
            return Object.assign({}, state, { employeeProjectList: action.payload.employeeProjectList });
        case ActionTypes.init_employeePermanentAddress:
            return Object.assign({}, state, { employeePermanentAddress: action.payload.employeePermanentAddress });
        case ActionTypes.init_employeeCurrentAddress:
            return Object.assign({}, state, { employeeCurrentAddress: action.payload.employeeCurrentAddress });
        default:
            return state;
    }
}