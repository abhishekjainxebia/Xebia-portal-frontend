import * as ActionTypes from '../state/action-types';

const INITIAL_STATE = {
    employeeList: [],
    status: false,
    error: undefined
}

export default function EmployeeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.INIT_EMPLOYEELIST:
            return Object.assign({}, state, { employeeList: action.payload.employeeList });
        case ActionTypes.LOADING:
            return Object.assign({}, state, { status: action.payload.status });
        case ActionTypes.ERROR:
            return Object.assign({}, state, { error: action.payload.error });
        default:
            return state;
    }
}