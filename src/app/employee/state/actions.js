import * as ActionTypes from "./action-types";
import * as service from "./service";
export function initEmployees(employeeList) {
    return {
        type: ActionTypes.INIT_EMPLOYEELIST,
        payload: {
            employeeList: employeeList
        }
    }
}

export function initEmployeeDetails(employeeDetails) {
    return {
        type: ActionTypes.INIT_EMPLOYEEDETAILS,
        payload: {
            employeeDetails: employeeDetails
        }
    }
}

export function initEmployeePermanentAddress(employeePermanentAddress) {
    return {
        type: ActionTypes.init_employeePermanentAddress,
        payload: {
            employeePermanentAddress: employeePermanentAddress
        }
    }
}

export function initEmployeeCurrentAddress(employeeCurrentAddress) {
    return {
        type: ActionTypes.init_employeeCurrentAddress,
        payload: {
            employeeCurrentAddress: employeeCurrentAddress
        }
    }
}

export function initiateEmployeeProjects(employeeProjectList) {
    return {
        type: ActionTypes.INIT_EMPLOYEEPROJECTLIST,
        payload: {
            employeeProjectList: employeeProjectList
        }
    }
}

export function loading(status) {
    return {
        type: ActionTypes.LOADING,
        payload: {
            status: status
        }
    }
}

//tunk ios middleware
//async calls, actions
//as per thunk, return action as function
export function fetchEmployees() {
    return function (dispatch, getState) {

        //dispatch(loading(true));
        console.log("called by thunk");
        service.getEmployeesList()
            .then(employeeList => {
                let action = initEmployees(employeeList);
                //action object
                dispatch(action);
                //dispatch(loading(false));
            });
    }
}

export function fetchEmployeeDetails(id) {
    return function (dispatch, getState) {
        //dispatch(loading(true));
        service.getEmployeeById(id)
            .then(employeeDetails => {
                let action = initEmployeeDetails(employeeDetails);
                //action object
                dispatch(action);
            });
    }
}

export function getEmployeePermenentAddress(id) {
    return function (dispatch, getState) {
        //dispatch(loading(true));
        service.getEmployeePermenentAddress(id)
            .then(employeePermanentAddress => {
                let action = initEmployeePermanentAddress(employeePermanentAddress);
                //action object
                dispatch(action);
            });
    }
}

export function getEmployeeCurrentAddress(id) {
    return function (dispatch, getState) {
        //dispatch(loading(true));
        service.getEmployeeCurrentAddress(id)
            .then(employeeCurrentAddress => {
                let action = initEmployeeCurrentAddress(employeeCurrentAddress);
                //action object
                dispatch(action);
            });
    }
}

export function updateEmployee(editedEmployeeDetails) {
    return {
        type: ActionTypes.INIT_EMPLOYEEDETAILS,
        payload: {
            employeeDetails: editedEmployeeDetails
        }
    }
}

export function saveUpdatedEmployee(EmployeeDetailsToSave, callbackResult) {
    return function (dispatch, getState) {
        //dispatch(loading(true));
        console.log("called by thunk");
        service.updateEmployee(EmployeeDetailsToSave)
            .then(data => {
                callbackResult(data)
            });
    }
}

export function saveNewEmployee(EmployeeDetailsToSave, callbackFunc) {
    return function (dispatch, getState) {
        console.log("called by thunk");
        service.saveEmployee(EmployeeDetailsToSave)
            .then(saveEmpApiResult => {
                callbackFunc(saveEmpApiResult)
            });
    }
}

export function getEmployeeProjects(id,callback) {
    return function (dispatch, getState) {
        console.log("called by thunk");
        service.getEmployeeProjects(id)
            .then(employeeProjectList => {
                callback(employeeProjectList)
                //let action = initEmployeeProjectDetails(employeeProjectDetails);
                //action object
                //dispatch(action);
                //callbackFunc(data)
            });
    }
}

export function saveUpdatedAddress(emp_id, updatedAddressDetails, callbackResult) {
    return function (dispatch, getState) {
        //dispatch(loading(true));
        console.log("called by thunk");
        service.updateEmployeeAddress(emp_id,updatedAddressDetails)
            .then(data => {
                callbackResult(data)
            });
    }
}