import * as service from "./service";
import {BrowserRouter} from 'react-router';
import * as ActionTypes from "./action-types";

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

export function initProjEmpList(projectTeam) {
    return {
        type: ActionTypes.INIT_PROJECTTEAM,
        payload: {
            projectTeam: projectTeam
        }
    }
}

// export function updateEmployee(editedEmployeeDetails) {
//     return {
//         type: ActionTypes.INIT_EMPLOYEEDETAILS,
//         payload: {
//             employeeDetails: editedEmployeeDetails
//         }
//     }
// }

export function initProjects(projectList){
    return {
        type: ActionTypes.INIT_PROJECTLIST,
        payload: {
            projectList: projectList
        }
    }
}

export function initProjectDetails(projectDetails){
    return {
        type: ActionTypes.INIT_PROJECTDETAILS,
        payload: {
            projectDetails: projectDetails
        }
    }
}

// export function initEditedProjects(updatedProjectDetails){
//     return {
//         type: ActionTypes.INIT_EDITEDPROJECTDETAILS,
//         payload: {
//             updatedProjectDetails: updatedProjectDetails
//         }
//     }
// }

//return action as object
export function initError(error) {
    return {
        type: ActionTypes.ERROR,
        payload: {
            error: error
        }
    }
}

// export function updateProject(editedProjectDetails){
//     return {
//         type: ActionTypes.INIT_PROJECTDETAILS,
//         payload: {
//             projectDetails: editedProjectDetails
//         }
//     }
// }

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

export function getProjEmpList(callback) {
    return function (dispatch, getState) {
        service.getProjEmpList()
            .then(projEmpList => {
                callback(projEmpList)
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

// //thunk in es6
// export function loginSuccess() {
//   return function(dispatch) {
//     dispatch({type: ActionTypes.LOGGED_IN})
//   };
// };

// //thunk in es6
// export const logout = () => {
//   return (dispatch) => {
//      storage.removeItem("token");
//      dispatch({type: ActionTypes.LOGGED_OUT});
//      //history.push("/");
//   };
// };


//tunk ios middleware
//async calls, actions
//as per thunk, return action as function
export function fetchProjects(){
    return function(dispatch,getState){

       // dispatch(loading(true));
        console.log("called by thunk");
        service.getProjectsList()
        .then( projectList =>{
            let action = initProjects(projectList);
            //action object
            dispatch(action);
            //dispatch(loading(false));
        });
    }
}

export function fetchProjectDetails(id){
    return function(dispatch,getState){
        //dispatch(loading(true));
        service.getProjectById(id)
        .then( projectDetails =>{
            let action = initProjectDetails(projectDetails);
            //action object
            dispatch(action);
            //dispatch(loading(false));
        });
    }
}


export function saveUpdatedProject(updatedProjectDetails,callbackResult){
    return function(dispatch,getState){
        //dispatch(loading(true));
        console.log("called by thunk");
        service.updateProject(updatedProjectDetails)
        .then(data =>{
            callbackResult(data)
            console.log(updatedProjectDetails)
        });
    }
}

export function saveNewProject(ProjectDetailsToSave,callbackResult){
    return function(dispatch,getState){
        //dispatch(loading(true));
        console.log("called by thunk");
        service.saveProject(ProjectDetailsToSave)
        .then(updatedProjectDetails =>{
            callbackResult(updatedProjectDetails)
            console.log(updatedProjectDetails)
            //dispatch(loading(false));
        });
    }
}
