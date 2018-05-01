import * as ActionTypes from "./action-types";
import * as service from "./service";
export function initEmployees(employeeList){
    return {
        type: ActionTypes.INIT_EMPLOYEELIST,
        payload: {
            employeeList: employeeList
        }
    }
}

export function initEmployeeDetails(employeeDetails){
    return {
        type: ActionTypes.INIT_EMPLOYEEDETAILS,
        payload: {
            employeeDetails: employeeDetails
        }
    }
}

export function initEditedEmployees(updatedEmployeeDetails){
    return {
        type: ActionTypes.INIT_EDITEDEMPLOYEEDETAILS,
        payload: {
            updatedEmployeeDetails: updatedEmployeeDetails
        }
    }
}

export function loading(status){
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
export function fetchEmployees(){
    return function(dispatch,getState){

        dispatch(loading(true));
        console.log("called by thunk");
        service.getEmployeesList()
        .then( employeeList =>{
            let action = initEmployees(employeeList);
            //action object
            dispatch(action);
            dispatch(loading(false));
        });
    }
}

export function fetchEmployeeDetails(id){
    return function(dispatch,getState){
        dispatch(loading(true));
        service.getEmployeeById(id)
        .then( employeeDetails =>{
            let action = initEmployeeDetails(employeeDetails);
            //action object
            dispatch(action);
            dispatch(loading(false));
        });
    }
}

export function updateEmployee(editedEmployeeDetails){
    return {
        type: ActionTypes.INIT_EMPLOYEEDETAILS,
        payload: {
            employeeDetails: editedEmployeeDetails
        }
    }
}

export function saveUpdatedEmployee(EmployeeDetailsToSave){
    return function(dispatch,getState){
        dispatch(loading(true));
        console.log("called by thunk");
        service.updateEmployee(EmployeeDetailsToSave)
        .then(updatedEmployeeDetails =>{
            let action = initEditedEmployees(EmployeeDetailsToSave);
            //action object
            dispatch(action);
            dispatch(loading(false));
        });
    }
}

export function saveNewEmployee(EmployeeDetailsToSave,callbackFunc){
    return function(dispatch,getState){
        console.log("called by thunk");
        service.saveEmployee(EmployeeDetailsToSave)
        .then(saveEmpApiResult =>{
            callbackFunc(saveEmpApiResult)
        });
    }
}
