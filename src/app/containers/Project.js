
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Project from "../components/Project";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
    return {
        employeeList: state.employeeStore.employeeList,
        projectList: state.projectStore.projectList,
        status: state.projectStore.status,
        error: state.projectStore.error,
        projectDetails: state.projectStore.projectDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: function() {
         let actionFn=actions.fetchProjects();
         dispatch(actionFn)
       },
       fetchEmployees: function () {
        let actionFn = actions.fetchEmployees();
        dispatch(actionFn)
       },
       fetchProjectDetails: function(id) {
        let actionFn=actions.fetchProjectDetails(id);
        dispatch(actionFn)
      },
      updateProject: function(editedProjectDetails) {
        let actionFn=actions.initProjectDetails(editedProjectDetails);
        dispatch(actionFn)
      },
      saveUpdatedProject: function(ProjectDetailsToSave,callbackResult) {
        let actionFn=actions.saveUpdatedProject(ProjectDetailsToSave,callbackResult);
        dispatch(actionFn)
      },
      saveNewProject: function(ProjectDetailsToSave,callbackResult) {
        let actionFn=actions.saveNewProject(ProjectDetailsToSave,callbackResult);
        dispatch(actionFn)
      },
      getEmployeeProjects: function (id,callback) {
        let actionFn = actions.getEmployeeProjects(id,callback);
        dispatch(actionFn)
      },
      getProjEmpList: function (callback) {
        let actionFn = actions.getProjEmpList(callback);
        dispatch(actionFn)
      },
      initProjEmpList: function (projectTeam) {
        let actionFn = actions.initProjEmpList(projectTeam);
        dispatch(actionFn)
      }
    }
 }

export default connect(mapStateToProps, 
                    mapDispatchToProps) (Project)