
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeSkill from "../components/EmployeeSkill";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
  return {
    employeeList: state.employeeStore.employeeList,
    projectList: state.projectStore.projectList,
    status: state.employeeStore.status,
    error: state.employeeStore.error,
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
  mapDispatchToProps)(EmployeeSkill)