
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Project from "../components/Project";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
    return {
        employeeList: state.employeeListStore.employeeList,
        projectList: state.projectListStore.projectList,
        status: state.projectListStore.status,
        error: state.projectListStore.error,
        projectDetails: state.projectDetailsStore.projectDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: function() {
         let actionFn=actions.fetchProjects();
         dispatch(actionFn)
       },
       fetchProjectDetails: function(id) {
        let actionFn=actions.fetchProjectDetails(id);
        dispatch(actionFn)
      },
      updateProject: function(editedProjectDetails) {
        let actionFn=actions.updateProject(editedProjectDetails);
        dispatch(actionFn)
      },
      saveUpdatedProject: function(ProjectDetailsToSave) {
        let actionFn=actions.saveUpdatedProject(ProjectDetailsToSave);
        dispatch(actionFn)
      },
      saveNewProject: function(ProjectDetailsToSave,callbackResult) {
        let actionFn=actions.saveNewProject(ProjectDetailsToSave,callbackResult);
        dispatch(actionFn)
      }
    }
 }

export default connect(mapStateToProps, 
                    mapDispatchToProps) (Project)