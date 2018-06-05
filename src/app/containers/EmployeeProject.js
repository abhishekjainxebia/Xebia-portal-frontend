
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeProject from "../components/EmployeeProject";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
  return {
    employeeList: state.employeeListStore.employeeList,
    projectList: state.projectListStore.projectList,
    status: state.employeeListStore.status,
    error: state.employeeListStore.error,
    employeeDetails: state.employeeDetailsStore.employeeDetails,
    employeeProjectList: state.employeeDetailsStore.employeeProjectList,
    employeePermanentAddress: state.employeeDetailsStore.employeePermanentAddress,
    employeeCurrentAddress: state.employeeDetailsStore.employeeCurrentAddress,
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