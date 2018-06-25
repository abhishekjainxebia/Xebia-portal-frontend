
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeProject from "../components/EmployeeProject";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
  return {
    employeeList: state.employeeStore.employeeList,
    projectList: state.projectStore.projectList,
    employeeDetails: state.employeeStore.employeeDetails,
    employeeProjectList: state.employeeStore.employeeProjectList,
    employeePermanentAddress: state.employeeStore.employeePermanentAddress,
    employeeCurrentAddress: state.employeeStore.employeeCurrentAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmployeeProjectList: function (employeeProjectList){
      let actionFn = actions.initiateEmployeeProjects(employeeProjectList);
      dispatch(actionFn)
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(EmployeeProject)