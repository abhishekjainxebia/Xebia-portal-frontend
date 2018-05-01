import * as ActionTypes from "./action-types";
import * as service from "./service";
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

export function initEditedProjects(updatedProjectDetails){
    return {
        type: ActionTypes.INIT_EDITEDPROJECTDETAILS,
        payload: {
            updatedProjectDetails: updatedProjectDetails
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

//return action as object
export function initError(error) {
    return {
        type: ActionTypes.ERROR,
        payload: {
            error: error
        }
    }
}

//tunk ios middleware
//async calls, actions
//as per thunk, return action as function
export function fetchProjects(){
    return function(dispatch,getState){

        dispatch(loading(true));
        console.log("called by thunk");
        service.getProjectsList()
        .then( projectList =>{
            let action = initProjects(projectList);
            //action object
            dispatch(action);
            dispatch(loading(false));
        });
    }
}

export function fetchProjectDetails(id){
    return function(dispatch,getState){
        dispatch(loading(true));
        service.getProjectById(id)
        .then( projectDetails =>{
            let action = initProjectDetails(projectDetails);
            //action object
            dispatch(action);
            dispatch(loading(false));
        });
    }
}

export function updateProject(editedProjectDetails){
    return {
        type: ActionTypes.INIT_PROJECTDETAILS,
        payload: {
            projectDetails: editedProjectDetails
        }
    }
}

export function saveUpdatedProject(ProjectDetailsToSave){
    return function(dispatch,getState){
        dispatch(loading(true));
        console.log("called by thunk");
        service.updateProject(ProjectDetailsToSave)
        .then(updatedProjectDetails =>{
            console.log(updatedProjectDetails)
            // let action = initEditedProjects(ProjectDetailsToSave);
            // //action object
            // dispatch(action);
            dispatch(loading(false));
        });
    }
}

export function saveNewProject(ProjectDetailsToSave,callbackResult){
    return function(dispatch,getState){
        dispatch(loading(true));
        console.log("called by thunk");
        service.saveProject(ProjectDetailsToSave)
        .then(updatedProjectDetails =>{
            callbackResult(updatedProjectDetails)
            console.log(updatedProjectDetails)
            dispatch(loading(false));
        });
    }
}
